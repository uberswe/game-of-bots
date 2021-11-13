const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const pages = require('./pages');
const Logic = require('./game/logic');
const Dotenv = require('dotenv-webpack');

const app = express();
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware'); //webpack hot reloading middleware
const compiler = webpack({
    mode: process.env.NODE_ENV,
    name: 'client side, output to ./public',
    entry: './client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new Dotenv()
    ],
});

app.use(middleware(compiler, {
    // webpack-dev-middleware options
}));

let games = []

const clientPath = path.resolve(`${__dirname}/../public`);
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
            if (obj.click === "play") {
                // Launching solo game
                let gameIsRunning = false
                for (let gi in games) {
                    if (games[gi].getTurnsLeft() > 0) {
                        gameIsRunning = true
                        let playerFound = false
                        for (let pi in games[gi].players) {
                            if (games[gi].players[pi].id === obj.clientId) {
                                playerFound = true
                                let socketFound = false
                                games[gi].players[pi].sockets.forEach(function (socket) {
                                    if (socket.id === sock.id) {
                                        socketFound = true
                                    }
                                })
                                if (!socketFound) {
                                    games[gi].players[pi].addSocket(sock)
                                }
                            }
                        }
                        if (!playerFound) {
                            console.log(obj)
                            games[gi].addPlayer({ sock: sock, clientId: obj.clientId })
                        }
                    }
                }
                if (!gameIsRunning) {
                    games.push(new Logic([{ sock: sock, clientId: obj.clientId }]))
                }
            }
            if (obj.click === "end") {
                // remove solo game
                const index = games.findIndex(instance => instance.clientId === obj.clientId);
                if (index > -1) {
                    games[index].endGame()
                    games.splice(index, 1);
                }
            }
        }
    });

    sock.on('disconnect', () => {
        console.log('user disconnected ' + sock.id);
    });

    console.log('a user connected ' + sock.id);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log('Server listening on ' + PORT);
});