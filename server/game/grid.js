const Tile = require('./tile');
const Pathfinder = require('./pathfinder');
const Resource = require('./resource');

class Grid {
    constructor(w, h){
        this.pathfinder = new Pathfinder();
        this.width = w;
        this.height = h;
      
        this.grid = {}; // dict{[x,y], Tile}
        this.generateGrid();

        this.resources = {}; // dict{[x, y], Resource}
    }

    // constructor for 'state' update
    getResources(){
        let result = [];
        for (const[k, v] of Object.entries(this.resources)){
            result.push({
                x: v.coord[0],
                y: v.coord[1],
                value: v.value
            })
        }
        return result;
    }

    generateGrid(){
        for (let x = 0; x < this.width; x++){
            for (let y = 0; y < this.height; y++){
                this.grid[[x, y]] = new Tile([x, y]);
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
                this.resources[[x, y]] = new Resource(this.resources.size, [x, y]);
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