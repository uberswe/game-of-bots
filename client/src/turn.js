import { stateAdapter } from "./util";

export class Turn {
    turnElement
    currentTurn
    maxTurns

    constructor() {
        this.update = this.update.bind(this)
        this.turnElement = document.getElementById('turn');
    }

    draw() {
        this.turnElement.innerHTML = "<h3>Turn " + this.currentTurn + "/" + this.maxTurns + "</h3>"
    }

    update(obj) {
        let adapted = stateAdapter(obj)
        this.currentTurn = adapted.turn
        this.maxTurns = adapted.maxTurns
        this.draw()
    }
}