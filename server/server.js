const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')
const app = express()

app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})
io.on("connection", (socket)=>{
    console.log(`USER CONNECTED: ${socket.id}`)
    socket.on("disconnect", ()=>{
        console.log("USER DISCONNECTED!")
    })
})
server.listen(5000, ()=>{
    console.log('SERVER IS RUNNING ON PORT 5000')
})
