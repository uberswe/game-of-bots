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
        this.drawLoop = this.drawLoop.bind(this)
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.drawLoop()
    }

    // Clear removes everything on the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save()
    }

    drawBots() {
        let bots = this.bots
        let tileSize = this.tileSize
        bots.forEach(function (bot, index) {
           bots[index].draw(tileSize)
        })
        this.bots = bots
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
                bots.push(new Bot(bot.id, bot.current.x, bot.current.y, bot.movingTo.x, bot.movingTo.y, ctx, tileSize, client.color))
            })
        })

        bots.forEach(function (bot) {
            if (!bot.drawn) {
                bots.forEach(function (bot2, index) {
                    // Detecting collisions of 2 or more bots
                    if (bot.id !== bot2.id && bot.x === bot2.x && bot.y === bot2.y) {
                        bot.isColliding = true
                        bot.colors.push(bot2.color)
                        // Prevent the colliding bot from being drawn
                        bots[index].drawn = true
                    }
                })
            }
        })

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

        // remove resources not in state
        resources.forEach(function (existing, i) {
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

        this.bots = bots
        this.resources = resources
    }

    drawLoop() {
        this.clear()
        this.drawResources()
        this.drawBots()
        this.ctx.restore()
        requestAnimationFrame(this.drawLoop)
    }


}