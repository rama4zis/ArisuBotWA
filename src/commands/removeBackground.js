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
        const outputFile = './assets/image/imageData.jpg'
        this.saveFileToLocal(media, outputFile)

        // waiting information 
        this.client.sendMessage(this.msgData.from, 'Mohon tunggu, sedang memproses gambar...')

        this.removeFileLocal('./assets/image/imageDataResult.png')
        // optional arguments
        const input = sharp('./assets/image/imageData.jpg')
        const rembg = new Rembg({
            logging: true,
        })
        
        const output = await rembg.remove(input)

        // console.log(input)
        // return
        // remove file result 
        // await output.webp().toFile("result.webp")
        await output.trim().png().toFile('./assets/image/imageDataResult.png')
        // optionally you can use .trim() too!
        await output.trim().webp().toFile('./assets/image/trim-imageDataResult.webp')

        // get result Image file 
        const resultImage = MessageMedia.fromFilePath('./assets/image/imageDataResult.png')

        if (toSticker) {
            this.client.sendMessage(this.msgData.from, resultImage, {
                sendMediaAsSticker: true,
            })
        } else {
            this.client.sendMessage(this.msgData.from, resultImage, {
                sendMediaAsDocument: true,
            })
        }
        // this.removeFileLocal(outputFile)

    }
}

module.exports = RemoveBackground