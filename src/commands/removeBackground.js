const fs = require('fs')
const { MessageMedia } = require('whatsapp-web.js')
const { removeBackgroundFromImageFile } = require('remove.bg')

class RemoveBackground {
    constructor(client, msgData) {
        this.client = client
        this.msgData = msgData
    }

    infoRemoveBackground() {
        this.client.sendMessage(this.msgData.from, 'Untuk menghapus background, silahkan kirim gambar dengan caption *!rmbg*')
    }

    async saveFileToLocal() {
        const media = await this.msgData.downloadMedia();

        // save image to local
        try {
            const buffer = new Buffer(media.data, 'base64')

            return fs.writeFileSync('./assets/image/result.jpg', buffer)
        } catch (error) {
            console.log(error)
            return
        }
    }

    removeFileLocal(filePath, exportMedia) {
        // then remove image from local storage
        fs.unlinkSync(filePath)
        fs.unlinkSync(exportMedia)
    }

    async generateRemoveBackground() {
        const filePath = "./assets/image/result.jpg"

        if (this.msgData.hasMedia && this.msgData.type === 'image' && this.msgData.type !== 'video' && this.msgData.type !== 'gif') {

            try {
                await removeBackgroundFromImageFile({
                    path: filePath,
                    apiKey: process.env.REMOVE_BG_API_KEY,
                    size: "auto",
                    type: "person",
                    crop: false,
                    scale: "original",
                    format: "png",
                    outputFile: "./assets/image/hasilEditArisu.png",
                });

                const exportMedia = MessageMedia.fromFilePath("./assets/image/hasilEditArisu.png")

                this.client.sendMessage(this.msgData.from, exportMedia, {
                    sendMediaAsDocument: true,
                })
            } catch (error) {
                console.log(error)

                this.client.sendMessage(this.msgData.from, 'Contrast: Images taken under good lighting conditions and with a high contrast between foreground and background give better results.')
                return
            }
            
        } else {
            this.client.sendMessage(this.msgData.from, 'Arisu hanya menerima gambar saja, bukan file lainnya!')
        }

    }
}

module.exports = RemoveBackground