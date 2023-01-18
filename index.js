const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
        dumpio: false
    }
});

require('dotenv').config()
const fs = require('fs')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const qrcode = require('qrcode-terminal')
const badwords = require("indonesian-badwords");
const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile } = require("remove.bg");
const { setTimeout } = require('timers');

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log('Alternative QR RECEIVED : ', qr)
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

client.on('message', async (msg) => {

    let message = msg.body.toLowerCase()

    // bad words check 
    if (badwords.analyze(message).count > 0) {
        // console.log(badwords.analyze(message))

        client.sendMessage(msg.from, 'Arisu tidak suka dengan kata-kata kasar, jangan kasar ya! 😠👊')

        const media = MessageMedia.fromFilePath('./assets/sound/Arisu_ExSkill_Level_3.mp3')
        client.sendMessage(msg.from, media, {
            sendAudioAsVoice: true
        })

        // const mediaVideo = MessageMedia.fromFilePath('./assets/arisuEX.mp4')
        // client.sendMessage(msg.from, mediaVideo, {
        //     sendVideoAsGif: true
        // })

        return
    }

    // Hello commands 
    if (message.includes('halo') || message.includes('hai') || message.includes('hi') || message.includes('hello')) {
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
        *!rmbg* - Remove background pada gambar
        *!arisu {Pertanyaan}* - Menanyakan kepada Arisu dengan hasil jawaban OpenAI(BETA)

        - Jangan berkata kotor
        - Kamu bisa tanya arisu lagi ngapain
        `

        client.sendMessage(msg.from, commands)

        console.log('Command !help telah dijalankan')

        return
    }

    // Command switch
    switch (true) {

        case msg.body === '!ping':
            msg.reply('pong');
            break;

        case msg.body === '!info':
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

        case msg.body === '!sticker':

            if (msg.hasMedia && msg.type === 'image' && msg.type !== 'video' && msg.type !== 'gif') {
                const media = await msg.downloadMedia();

                client.sendMessage(msg.from, media, {
                    sendMediaAsSticker: true,
                    stickerAuthor: 'Arisu',
                })

            } else {
                client.sendMessage(msg.from, 'Kirim gambar yang bener dong')
            }
            break;

        case msg.body === '!rmbg':
            if (msg.hasMedia && msg.type === 'image' && msg.type !== 'video' && msg.type !== 'gif') {
                const media = await msg.downloadMedia();

                // save image to local
                try {
                    const buffer = new Buffer(media.data, 'base64')

                    fs.writeFileSync('./assets/image/result.jpg', buffer)
                    // console.log('Image saved to local')
                } catch (error) {
                    console.log(error)
                    return
                }

                const filePath = "./assets/image/result.jpg"

                async function myRemoveBgFunction() {

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
                }

                myRemoveBgFunction()

                const exportMedia = MessageMedia.fromFilePath("./assets/image/hasilEditArisu.png")

                client.sendMessage(msg.from, exportMedia, {
                    sendMediaAsDocument: true,
                })

                // then remove image from local storage
                // fs.unlinkSync(filePath)
                // fs.unlinkSync(exportMedia)
            } else {
                client.sendMessage(msg.from, 'Arisu hanya menerima gambar saja, bukan file lainnya!')
            }

            break;

        case msg.body.startsWith('!arisu'):
            client.sendMessage(msg.from, 'Tunggu sebentar, Arisu sedang mengetik!')

            var resultMsg = msg.body.substr(msg.body.indexOf(" ") + 1);

            if (resultMsg === '!arisu' || resultMsg === ' ' || resultMsg === '' || resultMsg === null || resultMsg === undefined) {
                client.sendMessage(msg.from, 'Kamu gak tanya apa apa ke Arisu, jadi Arisu gabisa jawab!')
                return
            }

            setTimeout(async () => {
                const answer = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: resultMsg,
                    max_tokens: 250,
                    temperature: 0,
                })

                console.log(answer.data.choices[0].text)

                client.sendMessage(msg.from, answer.data.choices[0].text)
            }, 3000);

            break;

        case msg.body === '!interact':
            client.sendMessage(msg.from, 'Arisu masih mengembangkan fitur ini, tunggu update selanjutnya ya!')
            break;

        default:
            client.sendMessage(msg.from, "Maaf, Arisu belum paham dengan apa yang kamu katakan, ketik *!help* untuk melihat command yang tersedia")
            break;

    }

})