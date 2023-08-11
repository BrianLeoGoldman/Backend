const socket = io()

// Function to send a message to the server
function addMessage() {
    const message = document.getElementById('messageInput').value
    socket.emit('newMessage', message)
}

// Function to show messages from the server
function appendMessage(socketId, message) {
    const messageList = document.getElementById('messageList')
    const newMessage = document.createElement('p')
    newMessage.textContent = `${socketId}: ${message}`
    messageList.appendChild(newMessage)
}

socket.on('messageList', (messages) => {
    const messageList = document.getElementById('messageList')
    messageList.innerHTML = ""
    messages.forEach((message) => {
        appendMessage(message.socketId, message.message)
    })
})

socket.on('newMessage', (data) => {
    appendMessage(data.socketId, data.message)
})