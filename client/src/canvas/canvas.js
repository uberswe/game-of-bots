import Tile from './tile'
import { coordToPos } from "./util";

export class Canvas {
    gridSize = 25;
    tileSize = [10,10];
    grid = [];
    resources = [];
    bots = [];
    canvas;
    ctx;

    run() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // adjust the tilesize based on client browser height/width
        this.tileSize = [this.canvas.clientWidth / this.gridSize, this.canvas.clientHeight / this.gridSize]
        this.drawGrid();
    }

    drawGrid() {
        for (let x = 0; x < this.gridSize; x++){
            for (let y = 0; y < this.gridSize; y++){
                this.grid.push(new Tile([x, y], coordToPos(x, y, this.tileSize), [this.tileSize[0], this.tileSize[1]], this.ctx));
            }
        }
    }

    update(obj) {
        console.log("game state received", obj);
    }
}