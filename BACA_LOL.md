/**
@credit tio
@nightmare_md
**/

/**@tutorial pairing simple**/
#VPS
node index.js 628xxx

#PANEL
( ubah di command )
npm start (default) => node index.js 628xxx


#OPTIONAL PAIRING

1. menggunakan pairingNumber di settings.js
2. menggunakan argv command ( node index.js 628xxx )
3. menggunakan input ( node . ) lalu lanjutkan mengisi nomor

[ Update v 1.2.6 ]

List: 
ga gw buat, pake aja yang terbaru ini klo pengen ga Error.

Note: Plis dah itu plugins info-script.js jangan diubah.
dan ga usah dah kalian jual" sc ini, kalian ga ngerasain jadi gw, karna kalian jual sc ini gw yang kena imbas nya nama gw jelek di semua orang. mikir dikit lah. kalian enak tinggal jual jual doang ga mikirin siapa yg buat. udh banyak kejadian kemarin". manusia ga tau bales budi.

Hai kamu iser nightmare Md 

📌 Script ini selalu Up to Date
📌 Script ini menggunakan acc ip untuk menghindari pencurian atau penjualan secara ilegal
📌 Hargai creator sebisa kalian apa susahnya menghargai doang
📌 Kalau menjumpai script dengan owner yang asing segera lapor ke Owner
📌 plugins info-script jangan di ubah

Owner:
wa.me/6282285357346 (tio)



/**•───── MERRY ✧ MD ─────• **/
const list = {
    title: "Klik Disini!",
    sections: [{
        title: "Menu",
        highlight_label: "Recommended",
        rows: [{
                title: "menu list",
                description: "menampilkan menu list",
                id: ".menu",
            },
            {
                title: "menu all",
                description: "tampilkan semua menu",
                id: ".menu all",
            },
        ],
    }, ],
};

let quick = [
{
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Os\",\"id\":\".os\"}"
              },
              {
"name": 'cta_url',
"buttonParamsJson": `{
"display_text": "Url", "url": "https://", "merchant_url": "https://"}`
}
]

#Example serialize [ list button ] {
conn.sendListButton(m.chat, "List menu", list, footer)
} 

#Example serialize [ list button dg foto ] {
conn.sendListImageButton(m.chat, "List menu", list, footer, thumbnail)
}

#Example serialize [ url button ] {
conn.sendUrlButton(m.chat, "List menu", quick, footer)
}

#Example serialize [ url button dg foto ] {
conn.sendUrlImageButton(m.chat, "List menu", quick, footer, thumbnail)
}

#Example serialize [ foto dg list button & url button ] {
conn.sendListImageButton(m.chat, "List menu", quick, footer, thumbnail, quick)
}

#Example serialize [  list button & url button ] {
conn.sendListButton(m.chat, "List menu", quick, footer, quick)
}