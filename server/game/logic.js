const Player = require('./player');
const Grid = require('./grid');
const Bot = require('./bot');

class Logic {
    constructor(p, clientId){
        this.TICK_RATE = 1000;
        this.clientId = clientId
        this.GRID_SIZE = 25;
        this.COLOR_COUNT = 0;

        this.clients = p;
        this.players = [];
        p.forEach(player => {
            this.players.push(new Player(player.id, this.assignColor()));

            // This listens to the button clicks on the front end
            player.on('button', (obj) => {
                if (obj.hasOwnProperty("click")) {
                    console.log("click in frontend on: " + obj.click, obj)
                    if (obj.click == "deploy"){
                        this.requestBotSpawn(player);
                    }
                }
            })
        });

        this.grid = new Grid(this.GRID_SIZE, this.GRID_SIZE);
        this.turn = 0;
        this.maxTurns = 100;

        this.botID = 0; // unique id, increments with each bot spawned
        this.reservedSpawn = {}; // dict{[x, y], player}

        // Emit initial message and start the game!
        this.updatePlayers();
        this.runGame();
    }

    // constructor for 'state' update
    getPlayers(){
        let result = [];
        this.players.forEach(player => {
            result.push({
                points: player.points,
                color: player.color,
                cooldown: player.spawnCD,
                bots: player.getBots()
            })
        })
        return result;
    }

    requestBotSpawn(user){
        // Get the requesting users player in-game
        let player = null;
        this.players.forEach(p => {
            if (p.id == user.id){
                player = p;
            }
        });

        if (player != null){
            // Attempt to find a free location to spawn the bot
            let coord = this.grid.getAvailableSpawnTile(this.reservedSpawn);

            if (coord != null){
                console.log("(logic.js) - TODO: Put the player on CD");
                this.reservedSpawn[coord] = player;
            }
            else {
                console.error("(logic.js) - Free spawn location not found!");
            }
        }
        else {
            console.error("(logic.js) - Player null!");
        }
    }

    spawnBots(){
        for (const[k, v] of Object.entries(this.reservedSpawn)){
            let id = this.botID;
            this.botID += 1;

            // Player adds a bot with unique id and the array [x, y] pos
            let pos = k.split(',').map(Number);
            v.addBot(id, pos);
        }

        // Reset dictionary
        this.reservedSpawn = {};
    }

    activateBots(){
        // TODO: if increased speed implemented, this needs to check hits with each move
        this.players.forEach(player => {
            player.bots.forEach(bot => {
                this.grid.activateBot(bot);
            });
        });
    }

    async runGame(){
        while(this.turn < this.maxTurns){
            await this.waitForTick();
            this.calculateTurn();
            this.updatePlayers();
        }

        this.gameOver();
    }

    endGame() {
        this.turn = this.maxTurns
    }

    waitForTick(){
        return new Promise(resolve => setTimeout(resolve, this.TICK_RATE));
    }

    calculateTurn(){
        console.log("Turn processing...");
        // Spawn Resources
        if (this.turn % 5 == 0){
            this.grid.spawnResource(0);
        }
        // Spawn bots
        if (Object.keys(this.reservedSpawn).length > 0){
            this.spawnBots();
        }
        // Bot updates
        this.activateBots();

        this.turn++;
    }

    gameOver(){
        console.log("Game Over!");
        // Calculate who won...
    }

    updatePlayers() {
        this.clients.forEach(client => {
            client.emit('state', {
                tickRate: this.TICK_RATE,
                gridSize: this.GRID_SIZE,
                timeRemaining: this.maxTurns - this.turn,
                clients: this.getPlayers(),
                resources: this.grid.getResources()
            });
        });
    }

    assignColor(){
        function c() {
            var hex = Math.floor(Math.random()*256).toString(16);
            return ("0"+String(hex)).substr(-2); // pad with zero
        }
        return "#"+c()+c()+c();
    }
}

module.exports = Logic;