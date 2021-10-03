import Tile from './tile'
import { Resource } from './resource'
import { coordToPos } from './util'
import { Bot } from './bot'

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
        let ctx = this.ctx
        let tileSize = this.tileSize
        let resources = this.resources
        let bots = this.bots

        // Draw the grid if gridSize has changed
        if (this.gridSize !== obj.gridSize) {
            this.gridSize = obj.gridSize
            // adjust the tileSize based on client browser height/width
            this.tileSize = [this.canvas.clientWidth / this.gridSize, this.canvas.clientHeight / this.gridSize]
            this.drawGrid()
        }

        // Draw the bots

        obj.clients.forEach(function (client) {
            // TODO get the client color
            client.bots.forEach(function (bot) {
                let found = false
                bots.forEach(function (existing) {
                    if (existing.coord[0] === bot.current.x && existing.coord[1] === bot.current.y) {
                        found = true
                    }
                })
                // draw the resource one time
                if (!found) {
                    bots.push(new Bot(0, [bot.current.x, bot.current.y], ctx, tileSize))
                }
            })
        })

        this.bots = bots

        // Draw the resources
        obj.resources.forEach(function (coord) {
            let found = false
            resources.forEach(function (existing) {
                if (existing.coord[0] === coord.x && existing.coord[1] === coord.y) {
                    found = true
                }
            })
            // draw the resource one time
            if (!found) {
                resources.push(new Resource(0, [coord.x, coord.y], ctx, tileSize))
            }
        })

        this.resources = resources

        // remove resources not in state
        this.resources.forEach(function (existing, i) {
            let found = false
            obj.resources.forEach(function (coord) {
                if (existing.coord[0] === coord.x && existing.coord[1] === coord.y) {
                    found = true
                }
            })
            if (!found) {
                delete resources[i]
            }
        })

        this.resources = resources
    }


}