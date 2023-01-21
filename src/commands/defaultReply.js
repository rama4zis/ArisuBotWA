const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const { updateTempChat } = require('../utils/globalVar')

class DefaultReply {
    constructor(client, msgData, tempChat) {
        (async () => {
            let tempMsg = msgData.body + '\n'
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

            console.log('Sensei: ' + msgData.body + '\n')
            console.log('Arisu: ' + response.data.choices[0].text + '\n')
            let information = "\n\n_Untuk melihat menu, ketik menu_"

            updateTempChat(tempChat)
            return client.sendMessage(msgData.from, response.data.choices[0].text + information)
            // console.log('tempChat: ' + tempChat)
            // console.log(msg.from)
        })()
    }
}

module.exports = DefaultReply