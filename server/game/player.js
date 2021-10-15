const Bot = require('./bot');

class Player {
    constructor(id, socket, color){
        this.id = id;
        this.sockets = []
        this.sockets.push(socket)
        this.points = 0;
        this.color = color;
        this.bots = [];
        this.spawnCD = 0;
    }

    addSocket(socket) {
        this.sockets.push(socket)
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
                    x: bot.path[0],
                    y: bot.path[1]
                },
                state: "moving"
            })
        });
        return result;
    }

    addBot(id, pos){
        this.bots.push(new Bot(id, pos));
    }
}

module.exports = Player;