const Tile = require('./tile');
const Pathfinder = require('./pathfinder');
const Resource = require('./resource');
const Bot = require('./bot');

class Grid {
    constructor(w, h){
        this.pathfinder = new Pathfinder();
        this.width = w;
        this.height = h;

        this.grid = {}; // dict{[x,y], Tile}
        this.generateGrid();

        this.resources = {}; // dict{[x, y], Resource}
        this.bots = {}; // dict{[x, y], Bot}
    }

    // getter to retrieve what the player needs
    getResources(){
        let resources = [];
        for (const [key, value] of Object.entries(this.resources)) {
            resources.push([key], value.value);
        }
        return resources;
    }

    // getter to retrieve what the player needs (?add facing and destination)
    getBots(){
        let bots = [];
        for (const [key, value] of Object.entries(this.bots)) {
            bots.push([key], value.owner);
        }
        return bots;
    }

    generateGrid(){
        for (let x = 0; x < this.width; x++){
            for (let y = 0; y < this.height; y++){
                this.grid[[x, y]] = new Tile();
            }
        }
    }

    spawnResource(count){
        let max_x = this.width - 6;
        let max_y = this.height - 6;

        let x = this.getRandomInt(max_x) + 3;
        let y = this.getRandomInt(max_y) + 3;

        if (count < 5) {
            if (this.grid[[x, y]].occupied){
                count += 1;
                this.spawnResource(count);
            }
            else {
                console.log("Resource - [" + x + ", " + y + "] with " + count + " re-trys.");
                // Spawn the resource and update the tile
                this.resources[[x, y]] = new Resource(this.resources.size);
                this.grid[[x, y]].occupied = true;
            }
        }
        else {
            console.log("Resource spawning failed to find open space!");
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = Grid;