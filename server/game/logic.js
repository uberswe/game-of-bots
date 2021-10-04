const Player = require('./player');
const Grid = require('./grid');

class Logic {
    constructor(p){
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
                bots: player.getBots()
            })
        })
        return result;
    }

    requestBotSpawn(p){
        // TODO: find a free spot along the bottom row to spawn in a bot on
        let coord = this.grid.getAvailableSpawnTile(0);
        if (coord != null){
            // Reserve the tile in a dictionary {coord, player}
            // If accepted, put player on CD as well
            
            // Spawn the bot for the player on next tick

            // Clear the dictionary to be used again for next tick

        }
        // Make a function in the calculate turn?
        // To iterate through the bots to calculate their destinations
    }

    async runGame(){
        while(this.turn < this.maxTurns){
            await this.waitForTick();
            this.calculateTurn();
            this.updatePlayers();
        }

        this.gameOver();
    }

    waitForTick(){
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    calculateTurn(){
        console.log("Update!");
        // Spawn Resources
        if (this.turn % 5 == 0){
            this.grid.spawnResource(0);
        }
        // Spawn bots
        // Pathfinding for bots
        // Check for reaching destination
        // Check for hits
        this.turn++;
    }

    gameOver(){
        console.log("Game Over!");
        // Calculate who won...
    }

    updatePlayers() {
        this.clients.forEach(client => {
            client.emit('state', {
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