const { List } = require('whatsapp-web.js')

class Help {

    constructor(client, msgData, args = {}) {
        this.msgData = msgData
        this.from = msgData.from
        this.name = "menu",
            this.alias = ["help"],
            this.usage = "menu"

        this.client = client

        this.args = args
    }

    defaultList() {
        const section =
            [
                {
                    title: "Main Features",
                    rows: [
                        // {
                        //     id: "1",
                        //     title: "Generate Image",
                        //     description: "Membuat gambar dari AI dengan menggunakan kata kunci yang diberikan (Bukan mencari gambar)",
                        // },
                        {
                            id: "2",
                            title: "Membuat Sticker",
                            description: "Membuat sticker dari gambar yang diupload",
                        },
                        {
                            id: "3",
                            title: "Sticker No Background",
                            description: "Membuat sticker dari gambar yang diupload",
                        },
                        {
                            id: "4",
                            title: "Remove Background",
                            description: "Menghapus background dari gambar yang diupload",
                        }
                    ]
                },
                {
                    title: "Addtional Features",
                    rows: [
                        {
                            title: "Pap Arisu",
                            description: "Minta gambar Arisu",
                        }
                    ]
                },
                {
                    title: "Mini Game",
                    rows: [
                        {
                            title: "Gunting Batu Kertas"
                        }
                    ]
                },
                {
                    title: "Information",
                    rows: [
                        {
                            title: "Bot Info",
                            // description: "Informasi mengenai bot",
                        },
                        {
                            title: "Author Info",
                            // description: "Informasi mengenai pembuat bot",
                        }
                    ]
                }
            ]

            // parse section into json format
            const manualMenu = `
*Arisu Bot*
 Menu list:
- Membut Sticker : Untuk membuat sticker, silahkan kirim gambar dengan caption *!sticker*
- Sticker No Background : Untuk membuat sticker tanpa background, silahkan kirim gambar dengan caption *!sticker.nobg*
- Remove Background : Untuk menghapus background dari gambar, silahkan kirim gambar dengan caption *!remove.bg*
            `

        const list = new List('Klik menu untuk melihat keseluruhan', 'MENU', section, '', '') // (Body, ButtonText, Sections, Title, FooterText)

        return this.client.sendMessage(this.from, manualMenu)

    }

    botInfo() {
        return this.client.sendMessage(this.from, "*Arisu Bot*\nVersion: 1.1.0\nLast Updadte: 14 February 2023\n\nChange log:\n- Disable paper rock\n- Remove Background ON\n\n*knwow bug*:\n- Can't send List Type)")
    }

    botCreator() {
        return this.client.sendMessage(this.from, "*Author Information*\nName: Rama Aditya Saputra\n\nFacebook: https://www.facebook.com/rama4zis\n\nContact: 085856440266")
    }

}

module.exports = Help