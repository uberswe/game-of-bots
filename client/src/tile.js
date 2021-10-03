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

    // Each tile only needs to be two lines as the other squares will draw the other edges
    draw(x, y, w, h){
        // Square tiles
        this.ctx.beginPath();

        // This sets the starting position
        this.ctx.moveTo(x - w/2, y - h/2);

        // This draws the first line
        this.ctx.lineTo(x + w/2, y - h/2);

        // This draws the second line
        this.ctx.lineTo(x + w/2, y + h/2);
        this.ctx.stroke();

        // Finish path
        this.ctx.closePath();
    }
}

module.exports = Tile