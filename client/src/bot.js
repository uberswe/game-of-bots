import { coordToPos } from "./util";

export class Bot {
    ctx
    id
    coord
    tileSize

    constructor(id, coord, ctx, tileSize){
        this.id = id;
        this.coord = coord;
        this.ctx = ctx;
        this.tileSize = tileSize
    }

    draw(){
        let coord = coordToPos(this.coord[0], this.coord[1], this.tileSize)
        let w = this.tileSize[0]
        let h = this.tileSize[1]
        let x = coord[0]
        let y = coord[1]
        // Blue Trapazoid
        w = w - w/3
        h = h - h/3
        this.ctx.beginPath();
        this.ctx.moveTo((x - w/2) + (w/8), y - h/2);
        this.ctx.lineTo((x + w/2) - (w/8), y - h/2);
        this.ctx.lineTo(x + w/2, y + h/2);
        this.ctx.lineTo(x - w/2, y + h/2);
        this.ctx.lineTo((x - w/2) + (w/8), y - h/2);
        // Navy blue
        this.ctx.lineWidth = 1
        this.ctx.fillStyle = "#000080"
        this.ctx.fill();
        this.ctx.strokeStyle = "#000080";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    move(x, y){

    }
}