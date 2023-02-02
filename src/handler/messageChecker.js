const Help = require('../commands/help')
const MakeSticker = require('../commands/makeSticker')
const RemoveBackground = require('../commands/removeBackground')
const GenerateImage = require('../commands/generateImage')
const DefaultReply = require('../commands/defaultReply')
const PapArisu = require('../commands/papArisu')

let { getTempChat, setTempChat } = require('../utils/globalVar')
const RockPaper = require('../commands/mini-game/rockPaper')

class MessageChecker {
    constructor(client, msgData, quoteData) {
        this.msgData = msgData
        // console.log(msgData)
        this.listResponse = msgData._data.listResponse ? msgData._data.listResponse : null
        if (this.listResponse) {
            this.listResponse = this.listResponse.title
        }

        this.client = client
        this.message = (msgData.body).toLowerCase()
        this.quoteData = quoteData
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async checkMessage() {

        const admin = '6285856440266@c.us'
        if (this.msgData.from === admin) {
            console.log("This is dev mode")
        } else {
            // exit process
            console.log("Normal Mode")
            this.client.sendMessage(this.msgData.from, "Still maintenance, please wait...")
            return
        }

        await this.sleep(3000) // Delay 3 seconds
        console.log("this code return after timout")
        const message = this.message
        const commandTitle = this.listResponse



        switch (true) {

            // ================== Halo Arisu ==================

            case message === 'halo arisu' || message === 'hai arisu' || message === 'hi arisu' || message === 'hello arisu' || message === 'halo' || message === 'hai' || message === 'hi' || message === 'hello':
                const chat = await this.msgData.getChat();
                const contact = await this.msgData.getContact();

                await chat.sendMessage(`Hai @${contact.id.user}`, {
                    mentions: [contact]
                });
                break

            // ================== Normal ==================

            case message === 'menu' || message === 'help' || message === 'commands':
                new Help(this.client, this.msgData).defaultList()
                break

            case message.startsWith('!image'):
                new GenerateImage(this.client, this.msgData).generateImage()
                break

            case message === '!sticker':

                this.client.sendMessage(this.msgData.from, "This will take for a while, please wait...")
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(new MakeSticker(this.client, this.msgData).generateSticker())
                    }, 5000)
                })
                // await new MakeSticker(this.client, this.msgData).generateSticker()
                break

            case message === '!sticker.nobg':
                // new RemoveBackground(this.client, this.msgData).generateRemoveBackground(true)
                this.client.sendMessage(this.msgData.from, 'This feature is still in development')
                break

            case message === '!rmbg':
                // new RemoveBackground(this.client, this.msgData).generateRemoveBackground()
                this.client.sendMessage(this.msgData.from, 'This feature is still in development')
                break

            // ================== Admin Command ==================

            case message === '!reset.admin':
                this.client.sendMessage(this.msgData.from, 'Resetting temperory Arisu Chat history...')
                setTempChat()
                break

            case message === '!temp.chat':
                this.client.sendMessage(this.msgData.from, getTempChat())
                break

            // ================== Main Features ==================

            case commandTitle === 'Generate Image':
                new GenerateImage(this.client, this.msgData).infoGenerateImage()
                break

            case commandTitle === 'Membuat Sticker':
                new MakeSticker(this.client, this.msgData).infoSticker()
                break

            case commandTitle === 'Sticker No Background':
                new RemoveBackground(this.client, this.msgData).infoStickerNobg()
                break

            case commandTitle === 'Remove Background':
                new RemoveBackground(this.client, this.msgData).infoRemoveBackground()
                break

            // ======================== Addtional Features ========================

            case commandTitle === 'Pap Arisu':
                new PapArisu(this.client, this.msgData).getPapArisu()
                break

            // ======================== MINI GAME ========================

            case (this.msgData.hasQuotedMsg && this.quoteData.title === 'Gunting Batu Kertas'):

                const userInput = this.msgData.body
                new RockPaper(this.client, this.msgData).rockPaperRun(userInput)

                break

            case commandTitle === 'Gunting Batu Kertas':
                new RockPaper(this.client, this.msgData).rockPaperInfo()
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