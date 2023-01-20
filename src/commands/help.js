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
                        {
                            id: "1",
                            title: "Generate Image",
                            description: "Membuat gambar dari AI dengan menggunakan kata kunci yang diberikan (Bukan mencari gambar)",
                        },
                        {
                            id: "2",
                            title: "Membuat Sticker",
                            description: "Membuat sticker dari gambar yang diupload",
                        },
                        {
                            id: "3",
                            title: "Remove Background",
                            description: "Menghapus background dari gambar yang diupload",
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
                            title: "Author",
                            // description: "Informasi mengenai pembuat bot",
                        }
                    ]
                }
            ]

        const list = new List('Klik menu untuk melihat keseluruhan', 'MENU', section, '', '') // (Body, ButtonText, Sections, Title, FooterText)

        return this.client.sendMessage(this.from, list)

    }

    botInfo() {
        return this.client.sendMessage(this.from, "*Arisu Bot*\nVersion: 1.0.1\nLast Updadte: 21 January 2023\n")
    }

    botCreator() {
        return this.client.sendMessage(this.from, "*Author Information*\nName: Rama Aditya Saputra\nFacebook: https://www.facebook.com\nContact: 085856440266")
    }

}

module.exports = Help