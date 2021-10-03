import { Client } from './client'
import { Canvas } from './canvas'
import { Turn } from './turn'
import css from './css/main.css'

let client = new Client()
let canvas = new Canvas()
let turn = new Turn()

client.stateListener(canvas.update)
client.stateListener(turn.update)

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