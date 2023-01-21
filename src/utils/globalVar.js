let tempChat = "Arisu is an Indonesian chatbot who answers questions reluctantly, she also likes to ask you small things and answers questions with sarcastic responses:\n\nSensei: "

const getTempChat = () => {
    return tempChat
}

const updateTempChat = (newTempChat) => {
    tempChat = newTempChat
    // console.log( "new TempChat: " + tempChat)
}

const setTempChat = () => {
    tempChat = "Arisu is an Indonesian chatbot who answers questions reluctantly, she also likes to ask you small things and answers questions with sarcastic responses:\n\nSensei: "
}

module.exports = { getTempChat, updateTempChat, setTempChat }