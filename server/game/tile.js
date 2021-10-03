class Tile {
    constructor(coord){
        this.coord = coord; // [x, y]
        this.walkable = true;
        this.occupied = false;
    }
}

module.exports = Tile;