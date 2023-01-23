const { Buttons } = require('whatsapp-web.js')
const rockPaperScissors = require('rock-paper-scissors-ml')
const { getTempChat } = require('./../../utils/globalVar')
const DefaultReply = require('./../defaultReply')

class RockPaper {

    constructor(client, msgData) {
        this.client = client
        this.msgData = msgData
    }

    rockPaperInfo() {

        const buttonTemplate = [
            {
                body: "✌️"
            },
            {
                body: "✊"
            },
            {
                body: "🤚"
            },
        ]

        let button = new Buttons('Pilih salah satu ya', buttonTemplate, 'Gunting Batu Kertas', 'Arisu bersiap siap..... 🙂'); // (Body, [ButtonTemplate], Title, Footer)


        this.client.sendMessage(this.msgData.from, "Permainan gunting batu kertas bersama Arisu.....")
        this.client.sendMessage(this.msgData.from, button)

    }

    rockPaperRun(userinput) {

        const config = {
            choices: ['rock', 'paper', 'scissors'],
            history: 3,
            lastChoices: []
        }

        let generateUserInput = ''
        switch (userinput) {
            case '✊':
                generateUserInput = 'rock'
                break;

            case '✌️':
                generateUserInput = 'scissors'
                break;

            case '🤚':
                generateUserInput = 'paper'
                break;

            default:
                break;
        }

        const run = rockPaperScissors(config)
        const result = run(generateUserInput) //winHumane, winMachine, answerHumane, answerMachine
        console.log(result)

        let msg = ''
        if (result.winHumane === 1) {
            // get add msg 
            msg = `Ayo bermain gunting batu kertas, Arisu\nArisu: Arisu tidak akan kalah dari Sensei....\nSensei: ${result.answerHumane}\nArisu: ${result.answerMachine}\nSensei: Yeyyyy.... Kemenangan untuk Sensei....`

        } else if (result.winMachine === 1) {
            msg = `Ayo bermain gunting batu kertas, Arisu\nArisu: Arisu tidak akan kalah dari Sensei....\nSensei: ${result.answerHumane}\nArisu: ${result.answerMachine}\nSensei: Yahhh.... Sensei kalah....`
        } else {
            msg = `Ayo bermain gunting batu kertas, Arisu\nArisu: Arisu tidak akan kalah dari Sensei....\nSensei: ${result.answerHumane}\nArisu: ${result.answerMachine}\nSensei: Yahhh.... hasilnya seri....`
        }

        switch (result.answerMachine) {
            case 'rock':
                result.answerMachine = '✊'
                break;

            case 'scissors':
                result.answerMachine = '✌️'
                break;

            case 'paper':
                result.answerMachine = '🤚'
                break;

            default:
                break;
        }

        // updateTempChat(newTempChat)
        this.client.sendMessage(this.msgData.from, `${result.answerMachine}`)
        console.log("RockPaper Send")
        this.msgData.body = msg
        new DefaultReply(this.client, this.msgData, getTempChat())
    }

}

module.exports = RockPaper