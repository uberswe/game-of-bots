const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const pages = require('./pages');

const app = express();

const clientPath = path.resolve(`${__dirname}/../client`);
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

// Forward routing to seperate class to keep this class cleaner
app.use('/', pages);

io.on('connection', (sock) => {

    // A test function which emits a state to the frontend every 5 seconds
    setInterval(function () {
        io.emit('state', {
            timeRemaining: 90,
            clients: [
                {
                    points: 23,
                    bots: [
                        {
                            current: {
                                x: 5,
                                y: 9,
                            },
                            movingTo: {
                                x: 2,
                                y: 1,
                            },
                            direction: 0.9,
                            state: "moving",
                        }
                    ]
                },
                {
                    points: 32,
                    bots: [
                        {
                            current: {
                                x: 4,
                                y: 5,
                            },
                            movingTo: {
                                x: 3,
                                y: 2,
                            },
                            direction: 0.4,
                            state: "moving",
                        },
                        {
                            current: {
                                x: 9,
                                y: 9,
                            },
                            movingTo: {
                                x: 9,
                                y: 0,
                            },
                            direction: 0.0,
                            state: "collecting",
                        }
                    ]
                }
            ],
            resources: [
                {
                    x:3,
                    y:4,
                    type:"ruby"
                },
                {
                    x:2,
                    y:0,
                    type:"bush"
                },
                {
                    x:9,
                    y:7,
                    type:"rock"
                },
                {
                    x:3,
                    y:4,
                    type:"ruby"
                }
            ]
        });
    }, 60000);

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
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(8080, () => {
    console.log('Server listening on 8080');
});