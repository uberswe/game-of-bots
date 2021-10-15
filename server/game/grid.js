const Tile = require('./tile');
const Bot = require('./bot');
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

    getAvailableSpawnTile(reservedTiles){

        // Create a pool of the possible spawn
        let y = this.height - 1;
        let max_x = this.width;

        let tilePool = [];
        for (let x = 0; x < max_x; x++){
            tilePool.push([x, y]);
        }

        // Remove any tiles from the pool already in use
        if (reservedTiles != null){
            for (const[k, v] of Object.entries(reservedTiles)){
                if (tilePool.includes(k[0])){
                    tilePool = tilePool.filter( function(e) { return e !== k[0] });
                }
            }
        }

        tilePool.forEach(tileCoord => {
            if (this.grid[tileCoord].occupied || !this.grid[tileCoord].walkable){
                tilePool = tilePool.filter( function(e) { return e !== tileCoord });
            }
        });

        // return a random tile if the pool still contains any
        if (tilePool.length > 0){
            let rand = this.getRandomInt(tilePool.length);
            return tilePool[rand];
        }
        console.log("(grid.js) - Spawn location not found for request.");
        return null;
    }

    spawnResource(count){
        if (count < 5) {

            let max_x = this.width - 6;
            let max_y = this.height - 6;

            let x = this.getRandomInt(max_x) + 3;
            let y = this.getRandomInt(max_y) + 3;

            if (!this.grid[[x, y]].occupied && this.grid[[x, y]].walkable){
                console.log("Resource - [" + x + ", " + y + "] with " + count + " re-trys.");
                // Spawn the resource and update the tile
                this.resources[[x, y]] = new Resource(this.resources.size, [x, y]);
                this.grid[[x, y]].occupied = true;
            }
            else {
                count += 1;
                this.spawnResource(count);
            }
        }
        else {
            console.log("Resource spawning failed to find open space!");
        }
    }

    activateBot(bot){
        if (bot.hasDestination()){
            // Move along the path and check for collisions
            this.grid[bot.pos].occupied = false;
            bot.move();
            this.grid[bot.pos].occupied = true;
        }
        else {
            // Get a new destination and move next round
            bot.path = this.getDestination(bot.pos);
        }
    }

    getDestination(pos){
        // TODO: Randomly select on of the resources
        return this.pathfinder.calculatePath(pos, [pos[0], 0]);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = Grid;