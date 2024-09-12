import {
    yt
} from "../scraper/ytdl.js";

let handler = async (m, {
    conn,
    text: txt
}) => {
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)

    let text = txt.split(" ");
    if (!text[0]) return m.reply('[example] : .ytmp4 https://youtube.com/watch?v=bzpXVCqNCoQ')

    try {
        m.reply(wait)
        let results = await yt(text[0]);

        if (!text[1]) {
            let res = []
            let filter = Object.values(results.video).filter(v => v.container == "mp4" && v.quality)
                        
            for (let pus of filter) {
                res.push({
                    title: 'Download dengan resolusi'.toUpperCase(),
                    description: "Resolusi " + pus.qualityLabel,
                    id: `.ytmp4 ${text[0]} ${pus.qualityLabel}`
                })
            }
            const list = {
                title: "Klik Disini!",
                sections: [{
                    title: results.title,
                    rows: [...res]
                }]
            };
            await conn.sendListButton(m.chat, '乂 *Y T MP4*\n\nPilih dari daftar ini', list, wm, '[]', m)
        } else {
            let hasil = Object.values(results.video).filter(v => v.qualityLabel == text[1])
            await conn.sendMessage(m.chat, {
                video: {
                    url: hasil[0].url
                },
                caption: `\`${results.title}\`

👀 : \`${results.view}\`
⏳ : \`${results.durasi} Detik\`
👤 : \`${results.author.name} | ${results.author.user}\`
👥 : \`${results.author.subscriber_count}\`
📎 : \`${text[0]}\`
${readMore}
📃 : \`${results.desc}\``
            }, {
                quoted: m
            })
        }
    } catch (e) {
        throw eror
    }
}

handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = /^(ytv(ideo|ideos)?|ytmp4)$/i
handler.limit = true
handler.register = true

export default handler