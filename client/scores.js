export class Scores {
    turnElement
    timeRemaining
    scores = []

    constructor() {
        this.update = this.update.bind(this)
        this.turnElement = document.getElementById('scores');
    }

    draw() {
        let content = "<table style='border:0;'>"
        this.scores.forEach(function (score) {
            content = content + "<tr><td><div style='float:left; height: 20px; width: 20px; background-color: " + score.color + ";'></div></td><td>" + score.points + "</td></tr>"
        })
        content = content + "</table>"
        this.turnElement.innerHTML = content
    }

    update(obj) {
        let scores = []
        obj.clients.forEach(function (client) {
            // TODO later we should add functionality to color code each score
            scores.push({color: client.color, points: client.points})
        })
        this.scores = scores
        this.draw()
    }
}