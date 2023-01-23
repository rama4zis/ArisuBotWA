const Pixiv = require("@ibaraki-douji/pixivts");
// or just const pixiv = new (require("@ibaraki-douji/pixivts").Pixiv);

const { MessageMedia } = require('whatsapp-web.js');

const fs = require("fs");

class PapArisu {

    constructor(client, msgData) {

        this.client = client
        this.msgData = msgData

        this.pixiv = new (Pixiv.Pixiv)
    }

    async getPapArisu() {

        // this.pixiv.getIllustsByTag('YOUR PIXIV TAG').then(res => {
        //     // console.log(res);
        //     /*
        //     Returns an array of
        //     {
        //         id: string,
        //         title: string,
        //         illustType: number,
        //         description: string,
        //         tags: Array<string>,
        //         userId: string,
        //         userName: string,
        //         width: number,
        //         height: number,
        //         pageCount: number,
        //         createDate: string,
        //         updateDate: string
        //     }
        //     */
        // })

        // You can also parse optionals parameters
        const artwork = await this.pixiv.getIllustsByTag('ブルーアーカイブ 天童アリス', { mode: 'safe', page: 1 })


        // console.log(artwork)
        let randomNumber = Math.floor(Math.random() * 50)
        // console.log(randomNumber)
        console.log('artwork id: ' + artwork[randomNumber].id)
        // return

        const artworkId = (artwork[randomNumber].id)

        // Retriving All infos from an artwork
        const dataArtwork = await this.pixiv.getIllustByID(artworkId)
        // .then(res => {
        //     console.log(res)
            /*
            Return an object :
            {
                 AI: boolean,
                 restricted: number,
                 pageCount: number,
                 urls: Array<Image>,
                 illustID: string,
                 illustType: number,
                 description: string,
                 tags: Array<string>,
                 createDate: string,
                 uploadDate: string,
                 width: number,
                 height: number,
                 like: number,
                 bookmark: number,
                 view: number,
                 comment: number,
                 user: {
                     id: string,
                     name: string
                 },
                 title: string,
             }
             
             for the urls
             Array<Image> = An array of that
             {
                 mini: string,
                 thumb: string,
                 small: string,
                 regular: string,
                 original: string,
             }
            */
        // })

        this.pixiv.download(new URL(dataArtwork.urls[0].regular)).then(res => {
            fs.writeFileSync("./src/assets/image/pap/ArisuPap.jpg", res)

            /*
            returns a buffer who contains the downloaded image.
            */

            const media = MessageMedia.fromFilePath('./src/assets/image/pap/ArisuPap.jpg')
            const media2 = MessageMedia.fromFilePath('./src/assets/image/random/wleowleo.jpg')

            this.client.sendMessage(this.msgData.from, media, {
                caption: 'Pap Arisu',
            })

            this.client.sendMessage(this.msgData.from, media2, {
                sendMediaAsSticker: true,
                stickerAuthor: '+62 895-4139-26068',
                stickerName: 'Arisu Chatbot'
            })
        })


        // pixiv.getIllustsByTag('YOUR PIXIV TAG', {mode: 'all', page: 2}).then(console.log)
        /*
            The mode is for selecting what you want : 'safe' = All age artworks | 'r18' = NSFW only | 'all' = both of them
            And the page of the artworks
        */

    }

    async getPapCharacter(character) {

        const artwork = await this.pixiv.getIllustsByTag(`ブルーアーカイブ ${character}`, { mode: 'all', page: 1 })


        // console.log(artwork[0].url)
        // return

        let randomNumber = Math.floor(Math.random() * 50)

        this.pixiv.download(new URL(artwork[randomNumber].url)).then(res => {
            fs.writeFileSync("./src/assets/image/pap/ArisuPap.jpg", res)

            /*
            returns a buffer who contains the downloaded image.
            */
        })

    }



}

module.exports = PapArisu;