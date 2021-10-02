const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 25;
const TILE_SIZE = [canvas.clientWidth / GRID_SIZE, canvas.clientHeight / GRID_SIZE];
let grid = [];
let resources = [];
let bots = [];

class Tile {
    constructor(coord, pos, size){
        this.coord = coord;
        this.pos = pos;
        this.size = size;
        this.draw(pos[0], pos[1], size[0], size[1]);
    }

    draw(x, y, w, h){
        // Square tiles
        ctx.beginPath();
        ctx.moveTo(x - w/2, y - h/2);
        ctx.lineTo(x + w/2, y - h/2);
        ctx.lineTo(x + w/2, y + h/2);
        ctx.lineTo(x - w/2, y + h/2);
        ctx.closePath();
        ctx.stroke();
    }
}

class Resource {
    constructor(id, coord){
        this.id = id;
        this.coord = coord;
        this.draw(coordToPos(coord[0]), coordToPos(coord[1]));
    }

    draw(x, y){
        // Gold circles to indicate resources
        ctx.beginPath();



        ctx.closePath();
        ctx.stroke();
    }

    remove(){

    }
}

class Bot {
    constructor(id, coord){
        this.id = id;
        this.coord = coord;
        this.draw(coordToPos(coord[0]), coordToPos(coord[1]));
    }

    draw(x, y){
        // Green Trapazoid
        ctx.beginPath();



        ctx.closePath();
        ctx.stroke();
    }

    move(x, y){

    }

    remove(){

    }
}

function coordToPos(x, y){
    pos = [];
    pos[0] = x * TILE_SIZE[0] + TILE_SIZE[0] / 2;
    pos[1] = y * TILE_SIZE[1] + TILE_SIZE[1] / 2;
    return pos;
}

function init() {
    drawGrid();
}
init();

function drawGrid() {
    for (let x = 0; x < GRID_SIZE; x++){
        for (let y = 0; y < GRID_SIZE; y++){
            grid.push(new Tile([x, y], coordToPos(x, y), [TILE_SIZE[0], TILE_SIZE[1]]));
        }
    }
}