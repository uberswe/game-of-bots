import { coordToPos } from "./util";

class Bot {
    ctx;
    id;
    coord;

    constructor(id, coord, ctx, tileSize){
        this.id = id;
        this.coord = coord;
        this.ctx = ctx;
        this.tileSize = tileSize
        this.draw(coordToPos(coord[0], coord[1], this.tileSize), coordToPos(coord[0], coord[1], this.tileSize));
    }

    draw(x, y){
        // Green Trapazoid
        this.ctx.beginPath();



        this.ctx.closePath();
        this.ctx.stroke();
    }

    move(x, y){

    }

    remove(){

    }
}

module.exports = Bot;