import axios from 'axios'

let handler = async (m, { 
conn, text, command, usedPrefix
}) => {
if (!text) return m.reply(`Gunakan format ${usedPrefix + command} <url>\n\n*Contoh :* ${usedPrefix + command} https://github.com/`)
m.reply("_Loading. . ._")
let { data } = await axios.get(`https://api.pikwy.com/?tkn=125&d=3000&u=${encodeURIComponent(text)}&fs=1&w=1280&h=1200&s=100&z=100&f=jpg&rt=jweb`)
await conn.sendFile(m.chat, data.iurl, '', text, m)

}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^(ssweb|sstablet|sspc|sshp)$/i

handler.limit = true

export default handler