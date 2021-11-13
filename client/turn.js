export class Turn {
    turnElement
    timeRemaining
    countdown

    constructor() {
        this.update = this.update.bind(this)
        this.turnElement = document.getElementById('turn');
    }

    draw() {
        this.turnElement.innerHTML = "<h3>Time remaining " + this.timeRemaining + "</h3>"
    }

    drawCountDown(){
        this.turnElement.innerHTML = "<h3>Game Starts in " + this.countdown + "</h3>"
    }

    update(obj) {
        this.timeRemaining = obj.timeRemaining
        this.countdown = obj.countdown

        if (this.countdown > 0){
            this.drawCountDown()
        }
        else {
            this.draw()
        }
    }
}