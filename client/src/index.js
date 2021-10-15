import { Client } from './client'
import { Canvas } from './canvas'
import { Turn } from './turn'
import css from './css/main.css'
import {Scores} from "./scores";
import { GameComponent } from "./templates/game"
import { introComponent } from "./templates/intro"
import {State} from "./state";

let gameStarted = false
let state = new State()

const ic = document.getElementById('intro-component');

const gc = document.getElementById('game-component');

const playGame = document.getElementById('playGame');
playGame.addEventListener('click', function (e) {
    startGame()
});


window.addEventListener('load', function () {
// If the game is already running we start the game
    if (state.getGameIsRunning() === "true") {
        startGame()
    }
})

function startGame() {
    if (!gameStarted) {
        gameStarted = true
        state.setGameIsRunning("true")
    } else {
        console.log("Game tried to start while running")
        return
    }
    gc.classList.remove("hidden");
    ic.classList.add("hidden");
    let client = new Client(state)

    client.message("button", {
        "click":"play"
    })

    let canvas = new Canvas()
    let turn = new Turn()
    let scores = new Scores()

    client.stateListener(canvas.update)
    client.stateListener(turn.update)
    client.stateListener(scores.update)

    const deployBot = document.getElementById('deployBot');
    deployBot.addEventListener('click', function (e) {
        if (client !== undefined) {
            client.message("button", {
                "click": "deploy"
            })
        }
    });

    const turnBot = document.getElementById('turnBot');
    turnBot.addEventListener('click', function (e) {
        if (client !== undefined) {
            client.message("button", {
                "click": "turn"
            })
        }
    });

    const endGame = document.getElementById('endGame');
    endGame.addEventListener('click', function (e) {
        if (client !== undefined) {
            client.message("button", {
                "click": "end"
            })
            gc.classList.add("hidden");

            client.clearListeners()
            client = undefined
            canvas = undefined
            turn = undefined
            scores = undefined
            gameStarted = false
            state.setGameIsRunning("false")

            ic.classList.remove("hidden");
        }
    });
}