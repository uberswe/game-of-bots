import Tile from './tile'
import { Resource } from './resource'
import {coordToPos, uuidv4} from './util'
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

    // Clear removes everything on the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBots() {
        let bots = this.bots
        let tileSize = this.tileSize
        this.bots.forEach(function (bot) {
            if (!bot.drawn) {
                bots.forEach(function (bot2, index) {
                    // Detecting collisions of 2 or more bots
                    if (bot.id !== bot2.id && bot.coord[0] === bot2.coord[0] && bot.coord[1] === bot2.coord[1]) {
                        bot.isColliding = true
                        bot.colors.push(bot2.color)
                        // Prevent the colliding bot from being drawn
                        bots[index].drawn = true
                    }
                })
            }
        })

        this.bots = bots

        this.bots.forEach(function (bot) {
            bot.draw(tileSize)
        })
    }

    drawResources() {
        let tileSize = this.tileSize
        this.resources.forEach(function (resource) {
            resource.draw(tileSize)
        })
    }

    update(obj) {
        // [this.GRID_SIZE, this.turn, this.maxTurns, this.grid.getResources(), this.grid.getBots()]s
        let ctx = this.ctx
        let tileSize = this.tileSize
        let resources = this.resources
        let bots = []

        // Draw the grid if gridSize has changed
        if (this.gridSize !== obj.gridSize) {
            this.gridSize = obj.gridSize
            // adjust the tileSize based on client browser height/width
            this.tileSize = [this.canvas.clientWidth / this.gridSize, this.canvas.clientHeight / this.gridSize]
        }

        // Draw the bots
        obj.clients.forEach(function (client) {
            client.bots.forEach(function (bot) {
                bots.push(new Bot(bot.id, [bot.current.x, bot.current.y], ctx, tileSize, client.color))
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

        // Draw
        this.clear()
        this.drawGrid()
        this.drawBots()
        this.drawResources()
    }


}