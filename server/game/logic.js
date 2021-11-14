const Player = require('./player');
const Grid = require('./grid');
const { CleanPlugin } = require('webpack');

class Logic {
    constructor(p) {
        this.TICK_RATE = 1000;
        this.GRID_SIZE = 25;
        this.COLOR_COUNT = 0;

        this.players = [];
        p.forEach(player => {
            this.addPlayer(player)
        });

        this.grid = new Grid(this.GRID_SIZE, this.GRID_SIZE);
        this.countdown = 1;
        this.turn = 0;
        this.maxTurns = 600;

        this.botID = 0; // unique id, increments with each bot spawned
        this.reservedSpawn = {}; // dict{[x, y], player}

        // Buildup (1 per player per tick)
        this.resourceBuildup = 0;
        this.resourceBuildupCap = 5;

        // Emit initial message and start the game!
        this.updatePlayers();
        this.runGame();
    }

    getTurnsLeft() {
        return this.maxTurns - this.turn
    }

    addPlayer(player) {
        this.players.push(new Player(player.clientId, player.sock, this.assignColor(), this.assignSpawn(), this));
    }

    // constructor for 'state' update
    getPlayers() {
        let result = [];
        this.players.forEach(player => {
            result.push({
                points: player.points,
                color: player.color,
                spawnLocation: player.spawnLocation,
                bots: player.getBots()
            })
        })
        return result;
    }

    requestBotSpawn(user) {
        // Get the requesting users player in-game
        if (this.countdown < 1){
            let player = null;
            this.players.forEach(p => {
                if (p.id === user.id) {
                    player = p;
                }
            });

            if (player != null) {
                if (player.points >= 5){
                    // Attempt to find a free location to spawn the bot
                    let coord = this.grid.getAvailableSpawnTile(this.reservedSpawn, player.spawnLocation);

                    if (coord != null) {
                        this.reservedSpawn[coord.x + "," + coord.y] = player;
                        player.points = player.points - 5;
                    } else {
                        console.error("(logic.js) - Free spawn location not found!");
                    }
                }
                else {
                    console.error("(logic.js) - Player does not have enough points!");
                }
            } else {
                console.error("(logic.js) - Player null!");
            }
        }
        else {
            console.error("(logic.js) - Request denied, game waiting to started!");
        }
    }

    spawnBots() {
        console.log(this.reservedSpawn);
        for (const [k, v] of Object.entries(this.reservedSpawn)) {
            let id = this.botID;
            this.botID += 1;

            // Player adds a bot with unique id and the array [x, y] pos
            let pos = k.split(',').map(Number);
            v.addBot(id, pos);
        }

        // Reset dictionary
        this.reservedSpawn = {};
    }

    activateBots() {
        let bots = [];

        this.players.forEach(player => {
            player.bots.forEach(bot => {
                bots.push(bot);
            });
        });

        let collided = [];
        // Check to see if bots share a space
        bots.forEach(bot => {
            for (let i = 0; i < bots.length; i++){
                if (bot.pos == bots[i].pos && bot.id != bots[i].id){
                    collided.push(bot);
                }
            }
        });

        collided.forEach(collision => {
            this.players.forEach(player => {
                player.bots.forEach(bot => {
                    if (bot.id == collision.id)
                    player.deleteBot(collision);
                });
            });
        });

        // Moves all bots
        this.players.forEach(player => {
            player.bots.forEach(bot => {
                let value = this.grid.activateBot(bot);
                if (value > 0){ // Add any resource points collected
                    player.points = player.points + value;
                }
            });
        });
    }

    async runGame() {
        while (this.countdown > 0){
            console.log("Game Starts in: " + this.countdown);
            await this.waitForTick();
            this.countdown = this.countdown - 1;
            this.updatePlayers();
        }
        while (this.turn < this.maxTurns) {
            await this.waitForTick();
            this.calculateTurn();
            this.updatePlayers();
        }

        this.gameOver();
    }

    endGame() {
        this.turn = this.maxTurns
    }

    waitForTick() {
        return new Promise(resolve => setTimeout(resolve, this.TICK_RATE));
    }

    calculateTurn() {
        console.log("Turn processing...");
        // Spawn Resources
        this.resourceBuildup = this.resourceBuildup + this.players.length;
        while (this.resourceBuildup / this.resourceBuildupCap > 0){
            this.grid.requestSpawnResource();
            this.resourceBuildup = this.resourceBuildup - this.resourceBuildupCap;
        }
        // Spawn bots
        if (Object.keys(this.reservedSpawn).length > 0) {
            this.spawnBots();
        }
        // Bot updates
        this.activateBots();

        this.turn++;
    }

    gameOver() {
        console.log("Game Over!");
        // Calculate who won...
    }

    updatePlayers() {
        let players = this.getPlayers()
        let resources = this.grid.getResources()
        this.players.forEach(player => {
            player.sockets.forEach(client => {
                client.emit('state', {
                    tickRate: this.TICK_RATE,
                    gridSize: this.GRID_SIZE,
                    countdown: this.countdown,
                    timeRemaining: this.maxTurns - this.turn,
                    clients: players,
                    resources: resources
                });
            });
        });
    }

    assignSpawn() {
        let position = this.players.length % 4;
        // Assign according to amount of current players
        // order to assign: N, E, S, W
        switch(position){
            case 1:
                return 'E';
            case 2:
                return 'S';
            case 3:
                return 'W';
            default:
                return 'N';
        }
    }

    assignColor() {
        function c() {
            var hex = Math.floor(Math.random() * 256).toString(16);
            return ("0" + String(hex)).substr(-2); // pad with zero
        }

        return "#" + c() + c() + c();
    }
}

module.exports = Logic;