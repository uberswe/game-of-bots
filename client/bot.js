import {coordToPos} from "./util";

export class Bot {
    ctx
    id
    x
    y
    movingToX
    movingToY
    tileSize
    color
    colors
    isColliding
    drawn
    time = 0

    constructor(id, x, y, movingToX, movingToY, ctx, tileSize, color) {
        this.id = id;
        this.color = color
        this.colors = [color]
        this.isColliding = false
        this.x = x
        this.y = y
        this.movingToX = movingToX
        this.movingToY = movingToY
        this.ctx = ctx;
        this.tileSize = tileSize
        this.drawn = false
    }

    draw(tileSize) {
        if (this.drawn) {
            return
        } else if (this.isColliding) {
            this.drawColliding(tileSize)
            return
        }
        this.drawMoving(tileSize)
    }

    drawColliding(tileSize) {
        this.tileSize = tileSize
        let coord = coordToPos(this.x, this.y, tileSize)
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
        if (this.time === 0) {
            this.time = Date.now()
        }
        this.tileSize = tileSize
        let coord = coordToPos(this.x, this.y, this.tileSize)
        let mcoord = coordToPos(this.movingToX, this.movingToY, this.tileSize)
        let per = (Date.now() - this.time) / 1000
        let angleRadians = 1.571
        if (mcoord[0] > 15 && mcoord[1] > 15) {
            coord = [coord[0] + (mcoord[0] - coord[0]) * per, coord[1] + (mcoord[1] - coord[1]) * per]
            angleRadians += Math.atan2(mcoord[1] - coord[1], mcoord[0] - coord[0]);
        }
        let w = this.tileSize[0]
        let h = this.tileSize[1]
        let x = coord[0]
        let y = coord[1]
        // Trapazoid
        w = w - w / 3
        h = h - h / 3


        this.ctx.translate(x, y)
        this.ctx.rotate(angleRadians)
        this.ctx.beginPath()
        this.ctx.moveTo((-w / 2) + (w / 8), -h / 2);
        this.ctx.lineTo((w / 2) - (w / 8), -h / 2);
        this.ctx.lineTo(w / 2, h / 2);
        this.ctx.lineTo(-w / 2, h / 2);
        this.ctx.lineTo((-w / 2) + (w / 8), -h / 2);
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = this.color
        this.ctx.stroke()
        this.ctx.fillStyle = this.color
        this.ctx.fill();
        this.ctx.restore()
        this.ctx.save()

    }

    move(x, y) {

    }
}