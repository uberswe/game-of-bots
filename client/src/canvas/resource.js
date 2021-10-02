import { coordToPos } from "./util";

class Resource {
    constructor(id, coord, ctx, tileSize){
        this.id = id;
        this.coord = coord;
        this.ctx = ctx;
        this.tileSize = tileSize
        this.draw(coordToPos(coord[0], this.tileSize), coordToPos(coord[1], this.tileSize));
    }

    draw(x, y){
        // Gold circles to indicate resources
        this.ctx.beginPath();

        this.ctx.closePath();
        this.ctx.stroke();
    }

    remove(){

    }
}

module.exports = Resource;
