const Tile = require('./tile');
const Pathfinder = require('./pathfinder');
const Resource = require('./resource');

class Grid {
    constructor(w, h){
        this.width = w;
        this.height = h;
      
        this.grid = {}; // dict{[x,y], Tile}
        this.generateGrid();

        this.resources = {}; // dict{[x, y], Resource}
        this.resourceID = 0;
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

    getAvailableSpawnTile(reservedTiles, spawnLocation){
        let tilePool = [];
        let y, x, min_x, max_x, min_y, max_y;

        // Create a pool of the possible spawn
        switch (spawnLocation){
            case 'N':
                y = 0;
                min_x = 3;
                max_x = this.width - 3;

                for (x = min_x; x < max_x; x++){
                    tilePool.push({ "x":x, "y":y });
                }
                break;
            case 'E':
                min_y = 3;
                max_y = this.height - 3;
                x = this.width - 1;

                for (y = min_y; y < max_y; y++){
                    tilePool.push({ "x":x, "y":y });
                }
                break;
            case 'S':
                y = this.height - 1;
                min_x = 3;
                max_x = this.width - 3;

                for (x = min_x; x < max_x; x++){
                    tilePool.push({ "x":x, "y":y });
                }
                break;
            default:
                min_y = 3;
                max_y = this.height - 3;
                x = 0;

                for (y = min_y; y < max_y; y++){
                    tilePool.push({ "x":x, "y":y });
                }
                break;
        }

        // Remove any tiles from the pool already in use
        for (const[k, v] of Object.entries(reservedTiles)){
            let pos = [k.split(',').map(Number)];

            const index = tilePool.indexOf({"x":pos[0], "y":pos[1]});
            if (index > -1){
                console.log("Match found! (reserved)");
                tilePool.splice(index, 1);
            }
        }
        
        tilePool.forEach(tileCoord => {
            if (this.grid[[tileCoord.x, tileCoord.y]].occupied || !this.grid[[tileCoord.x, tileCoord.y]].walkable){
                const index = tilePool.indexOf({"x":tileCoord.x, "y":tileCoord.y});
                if (index > -1){
                    console.log("Match found! (occupied/walkable)");
                    tilePool.splice(index, 1);
                }
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

    requestSpawnResource(){
        let count = 0;
        this.spawnResource(count);
    }

    spawnResource(count){
        if (count < 5) {

            let max_x = this.width - 6;
            let max_y = this.height - 6;

            let x = this.getRandomInt(max_x) + 3;
            let y = this.getRandomInt(max_y) + 3;

            if (!this.grid[[x, y]].occupied && this.grid[[x, y]].walkable){
                //console.log("Resource - [" + x + ", " + y + "] with " + count + " re-trys.");
                // Spawn the resource and update the tile
                this.resources[[x, y]] = new Resource(this.resourceID++, [x, y]);
                this.grid[[x, y]].occupied = true;
            }
            else {
                count += 1;
                this.spawnResource(count);
            }
        }
        else {
            console.log("(grid.js) - Resource spawning failed to find open space!");
        }
    }

    activateBot(bot){
        if (bot.dying){
            return;
        }

        if (bot.hasDestination()){
            // Move along the path
            bot.move();
        }
        else {
            // Check if bot on resource
            for (const[k, v] of Object.entries(this.resources)){
                let pos = k.split(',').map(Number);
                let bX = bot.pos[0];
                let bY = bot.pos[1];
                let x = pos[0];
                let y = pos[1];
                if (bX == x && bY == y){
                    let value = v.value;
                    // remove resource
                    delete this.resources[k];
                    // return the value to give to player
                    return value;
                }
            }

            // With no match get a new destination and move next round
            bot.path = this.getDestination(bot.pos);
        }
    }

    getDestination(pos){
        let pool = [];
        // Add all resources location to pool
        for (const[k, v] of Object.entries(this.resources)){
            let poolPos = k.split(',').map(Number);
            pool.push(poolPos);
        }

        let dest;
        if (pool.length > 0){
            //Randomly select one of the destinations to go to
            dest = pool[this.getRandomInt(pool.length)];
        }
        else {
            // Default destination if no resource available
            dest = [(this.width/2), (this.height/2)];
        }

        let pathfinder = new Pathfinder();
        return pathfinder.findPath(this.width, this.height, this.grid, this.grid[[pos]], this.grid[[dest]]);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = Grid;