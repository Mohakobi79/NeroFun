import {
    FormData,
    Blob
} from 'formdata-node'
import {
    fileTypeFromBuffer
} from 'file-type'
import fetch from "node-fetch";
import cheerio from "cheerio"
import axios from "axios"

let handler = async (m, {
    conn
}) => {
    let q = m.quoted ? m.quoted : m;
    let mimes = (q.msg || q).mimetype || '';
    if (!/image/.test(mimes)) throw 'reply kode QR nya';
    let buffer = await q.download();

    try {
        let bs = buffer.toString('base64');
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(buffer);

        const IP = () => {
            const octet = () => Math.floor(Math.random() * 256);
            return `${octet()}.${octet()}.${octet()}.${octet()}`;
        };

        let form = new FormData();
        const blob = new Blob([buffer], {
            type: mime
        });
        form.append('barcodeUploadFile', blob, `file.${ext}`);
        form.append('type', 'FileBase64');
        form.append('FileBase64', bs);

        let res = await fetch('https://api.products.aspose.app/barcode/recognize/apiRequestRecognize?culture=en', {
            method: 'POST',
            headers: {
                accept: "image/bmp,image/gif,image/jpeg,image/png",
                "x-forwarded-for": await IP()
            },
            body: form
        });

        let json = await res.json();

        let response = await axios.get(`https://api.products.aspose.app/barcode/recognize/recognizeresult/${json.recognizeResultToken}?timestamp=0`)
        let { html } = response.data;
        let $ = cheerio.load(html);
        let result = $("textarea").text();
        let result2 = $('#resultUrl_0').attr('href');

        
        await m.reply(`*Result dari QR:* \n${result2 ? result2 : result}`);

    } catch (e) {
        throw e;
    }
}

handler.help = handler.command = ["readqr"];
handler.tags = ["tools"];
handler.limit = true;

export default handler;