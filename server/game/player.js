const Bot = require('./bot');

class Player {
    constructor(id, color){
        this.id = id;
        this.points = 0;
        this.color = color;
        this.bots = [];
    }

    // constructor for 'state' update
    getBots(){
        let result = [];
        this.bots.forEach(bot => {
            result.push({
                current: {
                    x: bot.pos[0],
                    y: bot.pos[1]
                },
                movingTo: {
                    x: bot.destination[0],
                    y: bot.destination[1]
                },
                state: "moving"
            })
        });
        return result;
    }
}

module.exports = Player;