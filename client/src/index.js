import { Client } from './client'
import { Canvas } from './canvas'
import { Turn } from './turn'
import css from './css/main.css'
import {Scores} from "./scores";

let client = new Client()
let canvas = new Canvas()
let turn = new Turn()
let scores = new Scores()

client.stateListener(canvas.update)
client.stateListener(turn.update)
client.stateListener(scores.update)

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