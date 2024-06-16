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

io.on('connection', (socket) => {
    console.log("user is connected")

    socket.on("disconnect",() => {
        console.log("User is disconnected")
    })
})

server.listen(port, () => {
    console.log(`app is running on port ${port}`)
})