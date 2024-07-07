const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const {v4 : uuidV4} = require('uuid')

const app  = express();
app.use(cors)
const port = 8000

const server = http.createServer(app)

const io = new Server(server, {
    cors: true
});


io.on('connection', (socket) => {
    console.log("user is connected")
    
    const createRoom = () => {
        const roomId = uuidV4();
        socket.join(roomId)
        socket.emit("room-created", {roomId})
        console.log("user wants to create room")
    }
    
    const joinRoom = () => {
      
        console.log("user wants to join room.")
    }
    
    
    socket.on("create-room", createRoom)

    socket.on("join-room", joinRoom)

    socket.on("disconnect",() => {
        console.log("User is disconnected")
    })
})

server.listen(port, () => {
    console.log(`app is running on port ${port}`)
})