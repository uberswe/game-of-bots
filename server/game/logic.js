const Player = require('./player');
const Grid = require('./grid');

class Logic {
    constructor(p, clientId){
        this.clientId = clientId
        this.GRID_SIZE = 25;

        this.clients = p;
        this.players = [];
        p.forEach(player => {
            this.players.push(new Player(player.id));
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
                bots: player.getBots()
            })
        })
        return result;
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
}

module.exports = Logic;