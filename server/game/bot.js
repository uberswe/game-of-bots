class Bot {
    constructor(id, pos) {
        this.id = id; // unique int

        this.speed = 1;
        this.health = 1;

        this.pos = pos;
        this.path = [];
    }

    hasDestination(){
        return this.path.length > 0;
    }

    move(){
        this.pos = this.path[0];
        this.path.shift();
    }
}

module.exports = Bot;