import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {text, conn, command}) => {
if (!text) throw "masukan lirik atau judulnya"

try {
await m.reply(wait)
const { thumbnail, title, lyrics } = await lyric(text);
await conn.sendMessage(m.chat, {image: {url: thumbnail}, caption: `*${title}*\n\n${lyrics}`}, {quoted: m})

} catch (e) {
throw eror
}
}
handler.help = ["lyrics"]
handler.tags = ["internet"]
handler.command = /^(lyric(s)?|lirik)$/i
export default handler

async function lyric(text) {
    try {
        let {
            data: res
        } = await axios.get(`https://search.azlyrics.com/suggest.php?q=${encodeURIComponent(text)}`);

        const {
            term,
            songs
        } = res;
        let {
            data: html
        } = await axios.get(songs[0].url);
        let $ = cheerio.load(html);
         let thumbnail = $(".album-image").attr("src");
        let lyrics = '';
        $('div:not(.div-share):not(.lyricsh):not(.ringtone)').each(function() {
            const text = $(this).html();
            if (text.includes('<!-- Usage of azlyrics.com content')) {
                lyrics = $(this).text().trim();
            }
        });

        return {
            title: term,
            thumbnail: "https://www.azlyrics.com" + thumbnail,
            lyrics
        }
    } catch (e) {
        return {
            msg: e
        }
    }
}