export class Scores {
    turnElement
    timeRemaining
    scores = []
    playerColor
    selfColor

    constructor() {
        this.update = this.update.bind(this)
        this.turnElement = document.getElementById('scores');
        this.playerColor = document.getElementById('playerColor')
    }

    draw() {
        this.playerColor.innerHTML = " | Your color is <span style='color: " + this.selfColor + ";'>" + this.selfColor + "</span> <div style='float:left; height: 20px; width: 20px; background-color: " + this.selfColor + ";'></div></br></br>"
        let content = "<table style='border:0;'>"
        this.scores.forEach(function (score) {
            content = content + "<tr><td><div style='float:left; height: 20px; width: 20px; background-color: " + score.color + ";'></div></td><td>" + score.points + "</td></tr>"
        })
        content = content + "</table>"
        this.turnElement.innerHTML = content
    }

    update(obj) {
        let scores = []
        let sc = "#000000"
        obj.clients.forEach(function (client) {
            if (client.self) {
                sc = client.color
            }
            scores.push({color: client.color, points: client.points})
        })
        this.selfColor = sc
        this.scores = scores
        this.draw()
    }
}