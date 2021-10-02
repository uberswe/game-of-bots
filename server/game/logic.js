const Grid = require('./grid');

class Logic {
    constructor(p){
        const GRID_SIZE = 25;

        this.grid = new Grid(GRID_SIZE, GRID_SIZE);
        this.players = p;
        this.turn = 0;
        this.maxTurns = 100;

        // Emit initial message and start the game!
        this.updatePlayers();
        this.runGame();
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
        this.players.forEach(player => {
            player.emit('state', [this.GRID_SIZE, this.turn, this.maxTurns, this.grid.getResources(), this.grid.getBots()]);
        });
    }
}

module.exports = Logic;