const fs = require('fs')
const { MessageMedia } = require('whatsapp-web.js')
// const { removeBackgroundFromImageFile } = require('remove.bg')

const { Rembg } = require("rembg-node")
const sharp = require("sharp")

class RemoveBackground {
    constructor(client, msgData) {
        this.client = client
        this.msgData = msgData
    }

    infoRemoveBackground() {
        this.client.sendMessage(this.msgData.from, 'Untuk menghapus background, silahkan kirim gambar dengan caption *!rmbg*')
    }

    infoStickerNobg() {
        return (this.client).sendMessage((this.msgData).from, 'Untuk membuat sticker, silahkan kirim gambar dengan caption *!sticker.nobg*')
    }

    async saveFileToLocal(input, output) {
        const media = input

        // save image to local
        try {
            const buffer = new Buffer(media.data, 'base64')

            return fs.writeFileSync(output, buffer)
        } catch (error) {
            console.log(error)
            return
        }
    }

    removeFileLocal(filePath) {
        // then remove image from local storage
        fs.unlinkSync(filePath)
    }

    async generateRemoveBackground(toSticker = false) {

        const media = await this.msgData.downloadMedia()
        const nameUnique = new Date().getTime()
        const outputFile = `./assets/image/${nameUnique}-imageData.jpg`
        this.saveFileToLocal(media, outputFile)

        // waiting information 
        this.client.sendMessage(this.msgData.from, 'Mohon tunggu, sedang memproses gambar...')

        // optional arguments
        const input = sharp(outputFile)

        try {
            const rembg = new Rembg({
                logging: true,
            })

            const outputNobg = await rembg.remove(input)

            await outputNobg.trim().resize(200).png().toFile(`./assets/image/${nameUnique}-DataResult.png`)
            // optionally you can use .trim() too!
            // await outputNobg.trim().webp().toFile(`./assets/image/trim-${nameUnique}-DataResult.webp`)

            // get result Image file 
            const resultImage = MessageMedia.fromFilePath(`./assets/image/${nameUnique}-DataResult.png`)

            if (toSticker) {
                this.client.sendMessage(this.msgData.from, resultImage, {
                    sendMediaAsSticker: true,
                })
            } else {
                this.client.sendMessage(this.msgData.from, resultImage, {
                    sendMediaAsDocument: true,
                })
            }

            // delete temp file 
            this.removeFileLocal(outputFile)
            this.removeFileLocal(`./assets/image/${nameUnique}-DataResult.png`)
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = RemoveBackground