import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {
    text,
    conn,
    command,
    usedPrefix
}) => {

    if (!text) return m.reply(usedPrefix + command + " naruto")

    try {
        await m.reply(wait);
        let result = await animeSearch(text);

        let cap = `*samehadaku*\n\n`.toUpperCase(),
            no = 1;
        for (let anim of result) {
            cap += `${no++}. ${anim.title}\n`
            cap += `Genre: ${anim.data.genre}\n`
            cap += `Type: ${anim.data.type}\n`
            cap += `Score: ${anim.data.score}\n`
            cap += `${anim.url}\n\n`
        }
        await m.reply(cap)

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ["samehadaku"]
handler.tags = ["anime", "internet"]

export default handler


async function animeSearch(text) {
    const {
        data
    } = await axios.get('https://samehadaku.email');
    const $ = cheerio.load(data);
    const scriptContent = $('#live_search-js-extra').html();
    const nonceMatch = scriptContent.match(/"nonce":"([^"]+)"/);
    const nonce = nonceMatch ? nonceMatch[1] : null;

    try {
        let {
            data: result
        } = await axios.get(`https://samehadaku.email/wp-json/eastheme/search/?keyword=${text}&nonce=${nonce}`)
        let objek = Object.values(result).map(v => v)
        return objek
    } catch (e) {
        return {
            msg: e
        }
    }
}