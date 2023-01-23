const { Client, LocalAuth, MessageMedia, List, NoAuth } = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth(),
    // authStrategy: new NoAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
});

require('dotenv').config()

const qrcode = require('qrcode-terminal')
const badwords = require("indonesian-badwords");
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log('Alternative QR RECEIVED : ', qr)
})

client.on('ready', async () => {
    console.log('Bot is ready!')
    // let newStatus = client.setStatus('Last Update 21 Jan 2023')
    // if (newStatus) {
    //     console.log('Status telah diubah')
    // } else {
    //     console.log('Status gagal diubah')
    // }
})

client.initialize()
// let tempChat = "Arisu is an Indonesian chatbot who answers questions reluctantly, he also likes to ask you small things and answers questions with sarcastic responses, sometimes he can get angry at you:\n\nSensei: "


const  MessageChecker  = require('./handler/messageChecker')

client.on('message', async (msg) => {

    // console.log('Get Quote Data from user: ', await msg.getQuotedMessage())
    const quoteData = await msg.getQuotedMessage()
    let resut = new MessageChecker(client, msg, quoteData)
    resut.checkMessage()

    return

    
    if (msg.type !== 'image' && !msg.hasMedia && msg.type === 'chat') {
        if (badwords.analyze(message).count > 0) {
            // console.log(badwords.analyze(message))

            client.sendMessage(msg.from, 'Arisu tidak suka dengan kata-kata kasar, jangan kasar ya! 😠👊')

            const media = MessageMedia.fromFilePath('./src/assets/sound/Arisu_ExSkill_Level_3.mp3')
            client.sendMessage(msg.from, media, {
                sendAudioAsVoice: true
            })

            // const mediaVideo = MessageMedia.fromFilePath('./src/assets/arisuEX.mp4')
            // client.sendMessage(msg.from, mediaVideo, {
            //     sendVideoAsGif: true
            // })

            return
        }
    }


    // Hello commands 
    if (message === 'halo arisu') {
        msg.reply('Halo juga!')
        return
    }

    // lagi apa commands
    if (message.includes('lagi apa') || message.includes('lagi ngapain') || message.includes('lagi ngapain?') || message.includes('lagi apa?') || message.includes('ngapain kamu') || message.includes('kamu ngapain?') || message.includes('ngapain')) {

        const random = Math.floor(Math.random() * 3)

        let reply = ""

        switch (random) {
            case 0:

                reply = "Arisu juga pengen kopi Sensei, belikan Arisu kopi dong..."
                client.sendMessage(msg.from, reply)
                const media = MessageMedia.fromFilePath('./src/assets/sound/Arisu_Cafe_Act_2.mp3')
                client.sendMessage(msg.from, media, {
                    sendAudioAsVoice: true
                })
                break;

            case 1:

                reply = "Arisu lagi rebahan, soalnya udah capek banget. Sensei juga gabut banget tanyain Arisu segala."
                client.sendMessage(msg.from, reply)
                const media2 = MessageMedia.fromFilePath('./src/assets/sound/Arisu_Cafe_Act_3.mp3')
                client.sendMessage(msg.from, media2, {
                    sendAudioAsVoice: true
                })
                break;

            case 2:

                reply = "Arisu sebenernya pengen dimanjain sama Sensei, tapi Sensei selalu skip banner aku. Jadi hari ini, tolong elus elusin Arisu ya."
                client.sendMessage(msg.from, reply)
                const media3 = MessageMedia.fromFilePath('./src/assets/sound/Arisu_Cafe_Act_5.mp3')
                client.sendMessage(msg.from, media3, {
                    sendAudioAsVoice: true
                })
                break;

            case 3:

                reply = "Arisu laper banget Sensei, suapin Arisu makanan dong...."
                client.sendMessage(msg.from, reply)
                const media4 = MessageMedia.fromFilePath('./src/assets/sound/Arisu_Lobby_2.mp3')
                client.sendMessage(msg.from, media4, {
                    sendAudioAsVoice: true
                })
                break;

            default:
                console.log('default')

                break;

        }

        return
    }

})