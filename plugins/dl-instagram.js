import axios from 'axios';
import cheerio from 'cheerio';
import FormData from 'form-data';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command,
    text
}) => {
    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://www.instagram.com/reel/CsC2PQCNgM1/?igshid=NTc4MTIwNjQ2YQ==`
    if (!text) return m.reply(input)
    
    try {

        await m.react('🕐')
        let media = await ig(text);
        for (let v of media) {
            await conn.sendFile(m.chat, v, '', null, m)
        }
    } catch (e) {
        throw e
    }
}
handler.help = ["instagram"]
handler.tags = ['downloader']
handler.command = /^(instagram|igdl|ig|instagramdl)$/i
handler.limit = true
handler.register = true

export default handler


async function ig(url) {
    try {
        const indown = axios.create({
            baseURL: 'https://indown.io/',
            withCredentials: true,
        });

        const {
            data: html,
            headers
        } = await indown.get('/');
        const $ = cheerio.load(html);
        const token = $('input[name="_token"]').val();
        const cookies = headers['set-cookie'].join('; ');

        const {
            data: ip
        } = await axios.get('https://api.ipify.org');

        const formData = new FormData();
        formData.append('referer', 'https://indown.io/insta-stories-download');
        formData.append('locale', 'en');
        formData.append('p', ip);
        formData.append('_token', token);
        formData.append('link', url);

        const response = await indown.post('/download', formData, {
            headers: {
                'XSRF-TOKEN': token,
                ...formData.getHeaders(),
                'Cookie': cookies,
            },
        });

        const $result = cheerio.load(response.data);
        const videoLink = $result('.btn-group-vertical a').first().attr('href');

        if (videoLink) {
            const hasil = new URL(videoLink).searchParams.get('url');
            return [hasil];
        } else {
            const imageUrls = [];
            $result('.image-link img').each((index, element) => {
                const imgSrc = $(element).attr('src');
                if (imgSrc) {
                    imageUrls.push(imgSrc);
                }
            });
            return imageUrls;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}