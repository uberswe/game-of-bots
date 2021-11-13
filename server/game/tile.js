class Tile {
    constructor(coord){
        this.coord = coord; // [x, y]
        this.walkable = true;
        this.occupied = false;

        this.gCost;
        this.hCost;

        this.parent;
    }

    fCost(){
        return gCost + hCost;
    }
}

module.exports = Tile;