const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
});

require('dotenv').config()
const fs = require('fs')
const { encode, decode } = require('node-base64-image')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const qrcode = require('qrcode-terminal')
const badwords = require("indonesian-badwords");
const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile, removeBackgroundFromImageBase64 } = require("remove.bg");

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

    let newStatus = client.setStatus('!help || !menu untuk melihat list command, bila Arisu tidak menjawab, maka kemungkinan dia sedang tidur')

    if (newStatus) {
        console.log('Status telah diubah')
    } else {
        console.log('Status gagal diubah')
    }
})

client.initialize()

// let moodBot = 'neutral'
let tempChat = "Arisu is a chatbot bahasa Indonesia that reluctantly answers questions with sarcastic responses:\n\nSensei: "




client.on('message', async (msg) => {

    const readDataMessageJSON = () => {
        // read JSON object from file
        fs.readFile('messageData.json', 'utf-8', (err, data) => {
            if (err) {
                throw err
            }

            // parse JSON object
            const dataJson = JSON.parse(data.toString())

            // return data
            return dataJson
        })
    }

    const dataFromId = (id) => {

        let totalData = (readDataMessageJSON()).data


    }

    const writeDataMessageJSON = (data, id) => {
        // if file not exist, create new file
        if (!fs.existsSync('messageData.json')) {
            fs.writeFileSync('messageData.json', JSON.stringify([]))
        }

        // Get current data
        let currentData = readDataMessageJSON()

        // search if id exist
        const index = currentData.findIndex((item) => item.id === id)

        // if id exist, update data
        if (index !== -1) {
            currentData[index] = data
        } else {
            // if id not exist, push data
            currentData.push(data)
        }
    }

    let message = ''
    if (msg.type === 'chat') {
        message = msg.body.toLowerCase()
    }
    // bad words check 
    // console.log(msg)
    if (msg.type !== 'image' && !msg.hasMedia) {
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
    if (message.includes('!help') || message.includes('!menu')) {

        let commands = `
        *Command List:*
        *!ping* - Cek apakah bot online
        *!info* - Menampilkan informasi bot
        *!sticker* - Kirim gambar sebagai sticker
        *!rmbg* - Remove background pada gambar
        *!mood* - Menampilkan mood Arisu saat ini
        *!arisu* {request gambar} - Request gambar apapun ke Arisu 

        - Jangan berkata kotor (coba aja deh)
        - Kamu bisa tanya arisu lagi ngapain
        - Langsung ngobrol aja (Jawaban yang didapat dari OpenAI)
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

        case msg.body === '!mood':

            client.sendMessage(msg.from, 'Arisu lagi mood jelek banget')

            break

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
                let media = await msg.downloadMedia();

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
                media = MessageMedia.fromFilePath(filePath)

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

                    client.sendMessage(msg.from, exportMedia, {
                        sendMediaAsDocument: true,
                    })
                } catch (error) {
                    console.log(error)

                    client.sendMessage(msg.from, 'Contrast: Images taken under good lighting conditions and with a high contrast between foreground and background give better results.')
                    return
                }

                // then remove image from local storage
                // fs.unlinkSync(filePath)
                // fs.unlinkSync(exportMedia)
            } else {
                client.sendMessage(msg.from, 'Arisu hanya menerima gambar saja, bukan file lainnya!')
            }

            break;

        case msg.body === '!interact':
            client.sendMessage(msg.from, 'Arisu masih mengembangkan fitur ini, tunggu update selanjutnya ya!')
            break;

        case msg.body === '!resetAdmin':

            tempChat = "Arisu is a chatbot bahasa Indonesia that reluctantly answers questions with sarcastic responses:\n\nSensei: "
            client.sendMessage(msg.from, 'Arisu sudah menghapus history chatnya')

            break

        case message.startsWith('!arisu'):

            msg.body = msg.body.replace('!arisu', '')

            client.sendMessage(msg.from, 'Fitur ini diganti dengan meminta Arisu mengirimkan gambar')

            

            // console.log("total data: " + response.data.data.length)

            // console.log(response.data.data)
            // return
            client.sendMessage(msg.from, 'Arisu sedang mencari gambar untukmu tunggu sebentar')

            try {

                const response = await openai.createImage({
                    prompt: msg.body,
                    n: 1,
                    size: "512x512",
                });

                for (let i = 0; i < response.data.data.length; i++) {
                    const element = response.data.data[i];

                    // console.log(element.url + '\n')
                    const elementUrl = element.url
                    const media = await MessageMedia.fromUrl(elementUrl)

                    // console.log(media)

                    client.sendMessage(msg.from, media)
                    console.log('Image sent')
                }
            } catch (error) {
                console.log(error)
                return
            }

            break

        default:

            if (true) {

                // let chatHistory = readDataMessageJSON()


                let tempMsg = msg.body + '\n'
                tempChat = tempChat + tempMsg + '\nArisu: '
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: tempChat,
                    temperature: 0.5,
                    max_tokens: 60,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0,
                    stop: ["Sensei", "Arisu"],
                });

                tempChat = tempChat + response.data.choices[0].text + '\nSensei: '

                client.sendMessage(msg.from, response.data.choices[0].text)
                console.log('Sensei: ' + msg.body + '\n')
                console.log('Arisu: ' + response.data.choices[0].text + '\n')
                // console.log('tempChat: ' + tempChat)
                // console.log(msg.from)
                return
            }

            client.sendMessage(
                msg.from,
                "Karena Arisu bukan bot AI, dan Arisu masih belajar, Untuk melihat command yang tersedia ketik *!help*"
            )
            break;

    }

})