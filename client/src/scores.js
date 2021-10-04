export class Scores {
    turnElement
    timeRemaining
    scores = []

    constructor() {
        this.update = this.update.bind(this)
        this.turnElement = document.getElementById('scores');
    }

    draw() {
        let content = ""
        this.scores.forEach(function (score) {
            content = content + score + "<br/>"
        })
        this.turnElement.innerHTML = content
    }

    update(obj) {
        let scores = []
        obj.clients.forEach(function (client) {
            // TODO later we should add functionality to color code esch score
            scores.push(client.points)
        })
        this.scores = scores
        this.draw()
    }
}