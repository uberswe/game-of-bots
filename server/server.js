const http = require('http');
const path = require('path');
const express = require('express');
//const socketio = require('socket.io');
const pages = require('./pages');

const app = express();

const clientPath = path.resolve(`${__dirname}/../client`);
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);
//const io = socketio(server);

// Forward routing to seperate class to keep this class cleaner
app.use('/', pages);

//io.on('connection', (sock) => {
    // TODO:
    // After the user has logged in and selects a server
    // Connect the user to all others on that server

//    sock.on('message', (text) => {
//        io.emit('message', text);
//    });
//});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(8080, () => {
    console.log('Server listening on 8080');
});