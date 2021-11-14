const Bot = require('./bot');

class Player {
    constructor(id, socket, color, spawnLoc, logic){
        this.id = id;
        this.sockets = []
        this.points = 20;
        this.color = color;
        this.bots = [];
        this.spawnLocation = spawnLoc;
        this.logic = logic
        this.addSocket(socket)
    }

    addSocket(socket) {
        // This listens to the button clicks on the front end
        socket.on('button', (obj) => {
            if (obj.hasOwnProperty("click")) {
                if (obj.click === "deploy") {
                    this.logic.requestBotSpawn(this);
                }
            }
        })
        this.sockets.push(socket)
    }

    // constructor for 'state' update
    getBots(){
        let result = [];
        this.bots.forEach(bot => {
            let destX, destY;
            if (typeof bot.path !== 'undefined' && bot.path.length > 0 && typeof bot.path[0] !== 'undefined' && typeof bot.path[0].coord !== 'undefined'){
                destX = bot.path[0].coord[0];
                destY = bot.path[0].coord[1];
            }
            else {
                destX = 0;
                destY = 0;
            }

            result.push({
                id: bot.id,
                current: {
                    x: bot.pos[0],
                    y: bot.pos[1]
                },
                movingTo: {
                    x: destX,
                    y: destY
                },
                state: "moving"
            })
        });
        return result;
    }

    addBot(id, pos){
        this.bots.push(new Bot(id, pos));
    }

    deleteBot(bot){
        for (let i = 0; i < this.bots.length; i++){
            if (bot.id == this.bots[i].id){
                this.bots.splice(i, 1);
                return;
            }
        }
    }
}

module.exports = Player;