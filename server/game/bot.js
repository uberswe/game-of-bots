class Bot {
    constructor(id, owner) {
        this.id = id; // unique int
        this.owner = owner; // player id

        this.speed = 1;
        this.health = 1;
    }
}

module.exports = Bot;