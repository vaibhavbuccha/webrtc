const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

const app  = express();
app.use(cors)
const port = 8000

const server = http.createServer(app)

const io = new Server(server, {
    cors: true
});

const joinRoom = () => {
    console.log("user wants to join room.")
}

const createRoom = () => {
    console.log("user wants to create room")
}


io.on('connection', (socket) => {
    console.log("user is connected")

    socket.on("create-room", createRoom)

    socket.on("join-room", joinRoom)

    socket.on("disconnect",() => {
        console.log("User is disconnected")
    })
})

server.listen(port, () => {
    console.log(`app is running on port ${port}`)
})