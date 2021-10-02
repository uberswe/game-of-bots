const Grid = require('./grid');
const Resource = require('./resource');
const Bot = require('./bot');

class Logic {
    constructor(p){
        const GRID_SIZE = 25;
        const TICK_RATE = 1000; // ms

        this.grid = new Grid(GRID_SIZE, GRID_SIZE);
        this.players = p;
        this.turn = 0;
        this.maxTurns = 100;

        // TODO: make a struct for the information needed to be sent to the clients
        this.resources = [];
        this.bots = [];

        // Emit initial message and start the game!
        this.updatePlayers();
        this.updateGame();
    }

    async updateGame(){
        while(this.turn < this.maxTurns){
            // Start an async wait for the turn to be over
            await this.waitForTick();
            // Then call the function to calculate turn
            this.calculateTurn();
            // Update the players
            this.updatePlayers();
            // Repeat
        }

        this.gameOver();
    }

    waitForTick(){
        return new Promise(resolve => setTimeout(resolve, this.TICK_RATE));
    }

    calculateTurn(){
        console.log("Update!");
        // Spawn Resources
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
        this.players.forEach(player => {
            player.emit('state', [this.GRID_SIZE, this.turn, this.maxTurns, this.resources, this.bots]);
        });
    }
}

module.exports = Logic;