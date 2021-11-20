const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const port = 5000;
const portSocket = 4000;
const { Server} = require('socket.io');

app.use(cors());
const server = http.createServer(app);

const io = new Server (server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`user id: ${socket.id}, joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () =>{
        console.log('user disconnected: ',socket.id);
    });
})


app.listen(port, ()=> {
    console.log(`Server is running on: http://localhost:${port} `);
});
server.listen(portSocket, ()=> {
    console.log(`Server socket is running on: http://localhost:${portSocket} `);
});