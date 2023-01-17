const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    }
})

require('dotenv').config()
const fs = require('fs')

const qrcode = require('qrcode-terminal')
const badwords = require("indonesian-badwords");
const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile } = require("remove.bg");


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})

client.on('ready', async () => {
    console.log('Bot is ready!')
    let newName = client.setDisplayName('Arisu REAL')

    if (newName) {
        console.log('Nama telah diubah')
    } else {
        console.log('Nama gagal diubah')
    }

    let newStatus = client.setStatus('Ini status baru milik Arisu')

    if (newStatus) {
        console.log('Status telah diubah')
    } else {
        console.log('Status gagal diubah')
    }
})



client.initialize()

// Check for first message 
// client.on('message_create', async (msg) => {
//     let greating = MessageMedia.fromFilePath('./assets/sound/Arisu_Login_1.mp3')
//     await client.sendMessage(msg.from, greating, {
//         sendAudioAsVoice: true
//     })
// })

client.on('message', async (msg) => {

    // debug 
    // console.log(msg)

    let message = msg.body.toLowerCase()



    // bad words check 
    if (badwords.analyze(message).count > 0) {
        // console.log(badwords.analyze(message))

        client.sendMessage(msg.from, 'Arisu tidak suka dengan kata-kata kasar, jangan kasar ya! 😠👊')

        const media = MessageMedia.fromFilePath('./assets/sound/Arisu_ExSkill_Level_3.mp3')
        client.sendMessage(msg.from, media, {
            sendAudioAsVoice: true
        })

        const mediaVideo = MessageMedia.fromFilePath('./assets/arisuEX.mp4')
        client.sendMessage(msg.from, mediaVideo, {
            sendVideoAsGif: true
        })

        return
    }

    // Hello commands 
    if (message.includes('halo') || message.includes('hai') || message.includes('hi') || message.includes('hello')) {
        msg.reply('Halo juga!')
        return
    }

    // lagi apa commands
    if (message.includes('lagi apa') || message.includes('lagi ngapain') || message.includes('lagi ngapain?')) {

        const random = Math.floor(Math.random() * 3)

        let reply = ""

        switch (random) {
            case 0:

                reply = "Arisu juga pengen kopi Sensei, belikan Arisu kopi dong..."
                client.sendMessage(msg.from, reply)
                const media = MessageMedia.fromFilePath('./assets/sound/Arisu_Cafe_Act_2.mp3')
                client.sendMessage(msg.from, media, {
                    sendAudioAsVoice: true
                })
                break;

            case 1:

                reply = "Arisu lagi rebahan, soalnya udah capek banget. Sensei juga gabut banget tanyain Arisu segala."
                client.sendMessage(msg.from, reply)
                const media2 = MessageMedia.fromFilePath('./assets/sound/Arisu_Cafe_Act_3.mp3')
                client.sendMessage(msg.from, media2, {
                    sendAudioAsVoice: true
                })
                break;

            case 2:

                reply = "Arisu sebenernya pengen dimanjain sama Sensei, tapi Sensei selalu skip banner aku. Jadi hari ini, tolong elus elusin Arisu ya."
                client.sendMessage(msg.from, reply)
                const media3 = MessageMedia.fromFilePath('./assets/sound/Arisu_Cafe_Act_5.mp3')
                client.sendMessage(msg.from, media3, {
                    sendAudioAsVoice: true
                })
                break;

            case 3:

                reply = "Arisu laper banget Sensei, suapin Arisu makanan dong...."
                client.sendMessage(msg.from, reply)
                const media4 = MessageMedia.fromFilePath('./assets/sound/Arisu_Lobby_2.mp3')
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



    // Show commands
    if (message.includes('!help')) {

        let commands = `
        *Command List:*
        *!ping* - Cek apakah bot online
        *!info* - Menampilkan informasi bot
        *!sticker* - Kirim gambar sebagai sticker
        *!image/removebg* - Menghapus background gambar
        `

        client.sendMessage(msg.from, commands)

        console.log('Command !help telah dijalankan')

        return
    }

    // Command switch
    switch (msg.body) {

        case '!ping':
            msg.reply('pong');
            break;

        case '!info':
            let info = `
            *Arisu*
            *Version:* 0.1.0

            *Author:*
            *Rama Aditya*

            *Facebook:*
            *https://www.facebook.com/rama4zis*

            Menerima saran dan kritik untuk pengembangan bot ini.
            `

            client.sendMessage(msg.from, info)
            break;

        case '!sticker':

            if (msg.hasMedia) {
                const media = await msg.downloadMedia();

                client.sendMessage(msg.from, media, {
                    sendMediaAsSticker: true,
                    stickerAuthor: 'Arisu Bukan BOT',
                })

            }
            break;

        case '!image/removebg':
            if (msg.hasMedia) {
                const media = await msg.downloadMedia();

                // save image to local
                try {
                    const buffer = new Buffer(media.data, 'base64')

                    fs.writeFileSync('./assets/image/result.jpg', buffer)
                    // console.log('Image saved to local')
                } catch (error) {
                    console.log(error)
                }

                const filePath = "./assets/image/result.jpg"


                const RemoveBgResult = await removeBackgroundFromImageFile({
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

                client.sendMessage(msg.from, exportMedia, {
                    sendMediaAsDocument: true,
                })

                // then remove image from local 
                fs.unlinkSync(filePath)
                fs.unlinkSync(exportMedia)
            }

            break;

        case '!interact':
            client.sendMessage(msg.from, 'Arisu masih mengembangkan fitur ini, tunggu update selanjutnya ya!')
            break;

        default:
            client.sendMessage(msg.from, "Maaf, Arisu belum paham dengan apa yang kamu katakan, ketik *!help* untuk melihat command yang tersedia")
            break;

    }

})