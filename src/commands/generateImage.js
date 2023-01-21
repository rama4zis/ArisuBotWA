const { Configuration, OpenAIApi } = require("openai")
const { MessageMedia } = require('whatsapp-web.js')

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

class GenerateImage {

    constructor(client, msgData) {
        this.client = client
        this.msgData = msgData
    }

    infoGenerateImage() {
        this.client.sendMessage(this.msgData.from, 'Arisu akan menghasilkan gambar dari kata kunci yang telah dimasukkan\nKamu juga bisa mengguanakan beberapa kata kunci sekaligus\nsilahkan kirim kata kunci dengan command *!image {kata kunci}*')
    }

    async generateImage() {
        this.msgData.body = this.msgData.body.replace('!image ', '')
        this.client.sendMessage(this.msgData.from, 'Fitur ini sementara tidak tersedia')
        return
        try {
            const response = await openai.createImage({
                prompt: this.msgData.body,
                n: 1,
                size: "512x512",
            });

            for (let i = 0; i < response.data.data.length; i++) {
                const element = response.data.data[i];
                // console.log(element.url + '\n')
                const elementUrl = element.url
                const media = await MessageMedia.fromUrl(elementUrl)
                // console.log(media)
                this.client.sendMessage(this.msgData.from, media)
                console.log('Image sent')
            }
        } catch (error) {
            console.log(error)
            return
        }
    }

}

module.exports = GenerateImage