import Tile from './tile'
import { Resource } from './resource'
import { coordToPos, stateAdapter } from "./util";

export class Canvas {
    gridSize = 0;
    tileSize = [10,10];
    grid = [];
    resources = [];
    bots = [];
    canvas;
    ctx;

    constructor() {
        this.update = this.update.bind(this)
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    drawGrid() {
        for (let x = 0; x < this.gridSize; x++){
            for (let y = 0; y < this.gridSize; y++){
                this.grid.push(new Tile([x, y], coordToPos(x, y, this.tileSize), [this.tileSize[0], this.tileSize[1]], this.ctx));
            }
        }
    }

    update(obj) {
        // [this.GRID_SIZE, this.turn, this.maxTurns, this.grid.getResources(), this.grid.getBots()]s
        let adapted = stateAdapter(obj)
        let ctx = this.ctx
        let tileSize = this.tileSize
        let resources = this.resources

        // Draw the grid if gridSize has changed
        if (this.gridSize !== adapted.gridSize) {
            this.gridSize = adapted.gridSize
            // adjust the tilesize based on client browser height/width
            this.tileSize = [this.canvas.clientWidth / this.gridSize, this.canvas.clientHeight / this.gridSize]
            this.drawGrid()
        }

        // Draw the resources
        adapted.resources.forEach(function (coord) {
            let found = false
            resources.forEach(function (existing) {
                if (existing.coord[0] === coord.x && existing.coord[1] === coord.y) {
                    found = true
                }
            })
            // draw the resource one time
            if (!found) {
                console.log("drawing new resource")
                resources.push(new Resource(0, [coord.x, coord.y], ctx, tileSize))
            }
        })
    }


}