const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('playerInput', (input) => {
        players[socket.id] = input;
        io.emit('playerUpdate', players);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        delete players[socket.id];
        io.emit('playerUpdate', players);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});