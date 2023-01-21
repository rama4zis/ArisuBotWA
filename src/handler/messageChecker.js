const Help = require('../commands/help')
const MakeSticker = require('../commands/makeSticker')
const RemoveBackground = require('../commands/removeBackground')
const GenerateImage = require('../commands/generateImage')
const DefaultReply = require('../commands/defaultReply')

let { getTempChat, setTempChat } = require('../utils/globalVar')

class MessageChecker {
    constructor(client, msgData, args = {}) {
        this.msgData = msgData
        // console.log(msgData)
        this.listResponse = msgData._data.listResponse ? msgData._data.listResponse : null
        if (this.listResponse) {
            this.listResponse = this.listResponse.title
        }

        this.client = client
        this.message = (msgData.body).toLowerCase()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async checkMessage() {

        await this.sleep(3000) // Delay 3 seconds
        console.log("this code return after timout")
        const message = this.message
        const commandTitle = this.listResponse

        switch (true) {

            case message === 'menu' || message === 'help' || message === 'commands':
                new Help(this.client, this.msgData).defaultList()
                break

            case message.startsWith('!image'):
                new GenerateImage(this.client, this.msgData).generateImage()
                break

            case message === '!sticker':
                new MakeSticker(this.client, this.msgData).generateSticker()
                break

            case message === '!rmbg':
                new RemoveBackground(this.client, this.msgData).generateRemoveBackground()
                break

            // ================== Admin Command ==================

            case message === '!reset.admin':
                this.client.sendMessage(this.msgData.from, 'Resetting temperory Arisu Chat history...')
                setTempChat()
                break

            case message === '!show.temp':
                this.client.sendMessage(this.msgData.from, getTempChat())
                break

            // ================== Main Features ==================

            case commandTitle === 'Generate Image':
                new GenerateImage(this.client, this.msgData).infoGenerateImage()
                break

            case commandTitle === 'Membuat Sticker':
                new MakeSticker(this.client, this.msgData).infoSticker()
                break

            case commandTitle === 'Remove Background':
                new RemoveBackground(this.client, this.msgData).infoRemoveBackground()
                break

            // ================== Information ==================

            case commandTitle === "Bot Info":
                new Help(this.client, this.msgData).botInfo()
                break

            case commandTitle === "Author Info":
                new Help(this.client, this.msgData).botCreator()
                break

            default:
                new DefaultReply(this.client, this.msgData, getTempChat())
                break

        }

    }
}

module.exports = MessageChecker