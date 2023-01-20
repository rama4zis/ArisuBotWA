class MakeSticker {

    constructor(client, msgData) {
        this.msgData = msgData
        this.client = client
    }

    infoSticker() {
        return (this.client).sendMessage((this.msgData).from, 'Untuk membuat sticker, silahkan kirim gambar dengan caption *!sticker*')
    }

    async generateSticker() {
        if (this.msgData.hasMedia && this.msgData.type === 'image' && this.msgData.type !== 'video' && this.msgData.type !== 'gif') {
            const media = await this.msgData.downloadMedia()

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

module.exports = MakeSticker