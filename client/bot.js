import {coordToPos} from "./util";

export class Bot {
    ctx
    id
    coord
    tileSize
    color
    colors
    isColliding
    drawn

    constructor(id, coord, ctx, tileSize, color) {
        this.id = id;
        this.color = color
        this.colors = [color]
        this.isColliding = false
        this.coord = coord;
        this.ctx = ctx;
        this.tileSize = tileSize
        this.drawn = false
    }

    draw(tileSize) {
        if (this.drawn) {
            return
        } else if (this.isColliding) {
            this.drawColliding(tileSize)
        } else {
            this.drawMoving(tileSize)
        }
        this.drawn = true
    }

    drawColliding(tileSize) {
        this.tileSize = tileSize
        let coord = coordToPos(this.coord[0], this.coord[1], tileSize)
        let w = this.tileSize[0]
        let h = this.tileSize[1]
        let x = coord[0]
        let y = coord[1]
        // circle
        let r = w - w / 3
        let context = this.ctx
        let cl = this.colors.length
        this.colors.forEach(function (color, index) {
            let slice = 360 / cl
            let counterClockwise = false;
            let startAngle = slice * index * Math.PI / 180;
            let endAngle = slice * (index + 1) * Math.PI / 180;
            context.beginPath();
            context.moveTo(x, y);
            context.arc(x, y, r, startAngle, endAngle, counterClockwise);
            context.closePath();
            context.fillStyle = color;
            context.fill();
        });

        // Red X
        this.ctx.beginPath();
        this.ctx.moveTo((x - w / 2), y - h / 2);
        this.ctx.lineTo((x + w / 2), y + h / 2);
        this.ctx.lineWidth = 5
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
        this.ctx.closePath()

        this.ctx.beginPath();
        this.ctx.moveTo((x + w / 2), y - h / 2);
        this.ctx.lineTo((x - w / 2), y + h / 2);
        this.ctx.lineWidth = 5
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
        this.ctx.closePath()
    }

    drawMoving(tileSize) {
        this.tileSize = tileSize
        let coord = coordToPos(this.coord[0], this.coord[1], this.tileSize)
        let w = this.tileSize[0]
        let h = this.tileSize[1]
        let x = coord[0]
        let y = coord[1]
        // Trapazoid
        w = w - w / 3
        h = h - h / 3
        this.ctx.beginPath();
        this.ctx.moveTo((x - w / 2) + (w / 8), y - h / 2);
        this.ctx.lineTo((x + w / 2) - (w / 8), y - h / 2);
        this.ctx.lineTo(x + w / 2, y + h / 2);
        this.ctx.lineTo(x - w / 2, y + h / 2);
        this.ctx.lineTo((x - w / 2) + (w / 8), y - h / 2);
        this.ctx.lineWidth = 1
        this.ctx.fillStyle = this.color
        this.ctx.fill();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    move(x, y) {

    }
}