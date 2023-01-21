const RemoveBackground = require("./removeBackground")

class StickerNobg extends RemoveBackground{
    constructor(client, msgData) {
        this.msgData = msgData
        this.client = client
    }

    infoStickerNobg() {
        return (this.client).sendMessage((this.msgData).from, 'Untuk membuat sticker, silahkan kirim gambar dengan caption *!sticker.nobg*')
    }

    async generateStickerNobg() {

        if (this.msgData.hasMedia && this.msgData.type === 'image' && this.msgData.type !== 'video' && this.msgData.type !== 'gif') {
            const media = await this.msgData.downloadMedia()

            this.saveFileToLocal()

            

            return this.client.sendMessage(this.msgData.from, media, {
                sendMediaAsSticker: true,
                stickerAuthor: '+62 895-4139-26068',
                stickerName: 'Arisu Chatbot'
            })
        } else {
            return this.client.sendMessage(this.msgData.from, 'Kirim gambar yang bener dong!')
        }

    }
}

module.exports = StickerNobg