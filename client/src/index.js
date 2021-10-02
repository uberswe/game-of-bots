import { Client } from './client/client'
import { Canvas } from './canvas/canvas'
import css from './css/main.css'

let client = new Client()
client.run()
let canvas = new Canvas()
canvas.run()

client.stateListener(canvas.update)

const deployBot = document.getElementById('deployBot');
deployBot.addEventListener('click', function (e) {
    client.message("button", {
        "click":"deploy"
    })
});

const turnBot = document.getElementById('turnBot');
turnBot.addEventListener('click', function (e) {
    client.message("button", {
        "click":"turn"
    })
});