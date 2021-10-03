class Bot {
    constructor(id, pos) {
        this.id = id; // unique int

        this.speed = 1;
        this.health = 1;

        this.pos = pos;
        this.destination = null;
    }

    hasDestination(){
        return this.destination != null;
    }
}

module.exports = Bot;