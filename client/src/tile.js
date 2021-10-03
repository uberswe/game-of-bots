class Tile {
    coord
    pos
    size
    ctx
    constructor(coord, pos, size, ctx){
        this.coord = coord;
        this.pos = pos;
        this.size = size;
        this.ctx = ctx;
        this.draw(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    }

    draw(x, y, w, h){
        // Square tiles
        this.ctx.beginPath();
        this.ctx.moveTo(x - w/2, y - h/2);
        this.ctx.lineTo(x + w/2, y - h/2);
        this.ctx.lineTo(x + w/2, y + h/2);
        this.ctx.lineTo(x - w/2, y + h/2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}

module.exports = Tile