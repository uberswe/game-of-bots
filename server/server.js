const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const pages = require('./pages');

const Logic = require('./game/logic');

const app = express();

const clientPath = path.resolve(`${__dirname}/../client`);
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

// Forward routing to seperate class to keep this class cleaner
app.use('/', pages);

io.on('connection', (sock) => {

    sock.on('message', (text) => {
        // This sock.id is how we can identify clients for now but it changes if a user disconnects because they reconnect the page or something
        console.log("message received: " + sock.id)
        // TODO This is emitting the received message to all other clients
        io.emit('message', text);
    });

    // This listens for button presses from the frontend
    sock.on('button', (obj) => {
        if (obj.hasOwnProperty("click")) {
            console.log("click in frontend on: " + obj.click, obj)
        }
    });

    sock.on('disconnect', () => {
        console.log('user disconnected ' + sock.id);
    });

    console.log('a user connected ' + sock.id);

    // Launching solo game
    new Logic([sock]);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(8080, () => {
    console.log('Server listening on 8080');
});