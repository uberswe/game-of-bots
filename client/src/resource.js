import { coordToPos } from "./util";

export class Resource {
    id
    coord
    ctx
    tileSize

    constructor(id, coord, ctx, tileSize){
        this.id = id;
        this.coord = coord;
        this.ctx = ctx;
        this.tileSize = tileSize
        this.draw(coordToPos(coord[0], coord[1], this.tileSize));
    }

    draw(coord){
        // Gold circles to indicate resources
        this.ctx.beginPath();
        this.ctx.arc(coord[0], coord[1], this.tileSize[0]/4, 0, 2 * Math.PI);
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = "#DAA520";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    remove(){

    }
}