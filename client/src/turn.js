export class Turn {
    turnElement
    timeRemaining

    constructor() {
        this.update = this.update.bind(this)
        this.turnElement = document.getElementById('turn');
    }

    draw() {
        this.turnElement.innerHTML = "<h3>Time remaining " + this.timeRemaining + "</h3>"
    }

    update(obj) {
        this.timeRemaining = obj.timeRemaining
        this.draw()
    }
}