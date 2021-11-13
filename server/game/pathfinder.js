class Pathfinder {
    constructor(){

    }

    findPath(w, h, grid, pos, dest){
        this.width = w;
        this.height = h;

        this.grid = grid; // dict{[x,y], Tile}

        // Clear all of the tile values in order to use again
        for (const[k, v] of Object.entries(this.grid)){
            v.gCost = 'undefined';
            v.hCost = 'undefined';
            v.parent = 'undefined';
        }

        return this.calculatePath(pos, dest);
    }

    calculatePath(start, target){
        let openSet = [];
        let closedSet = [];
        openSet.push(start);

        while (openSet.length > 0){
            let currentTile = openSet[0];

            for (let i = 1; i < openSet.length; i++){
                if (openSet[i].fCost < currentTile.fCost || openSet[i].fCost == currentTile.fCost && openSet[i].hCost < currentTile.hCost){
                    currentTile = openSet[i];
                }
            }

            // Remove currentTile from openSet
            for (let i = 0; i < openSet.length; i++){
                if (openSet[i] === currentTile){
                    openSet.splice(i, 1);
                }
            }

            closedSet.push(currentTile);

            if (currentTile == target){
                return this.retracePath(start, target);
            }

            this.getNeighbours(currentTile).forEach(neighbour => {
                if (!neighbour.walkable || closedSet.includes(neighbour)){
                    return;
                }

                let newMovementCostToNeighbour = currentTile.gCost + this.getDistance(currentTile, neighbour);
                if (newMovementCostToNeighbour < neighbour.gCost || !openSet.includes(neighbour)){
                    neighbour.gCost = newMovementCostToNeighbour;
                    neighbour.hCost = this.getDistance(neighbour, target);
                    neighbour.parent = currentTile;

                    if (!openSet.includes(neighbour)){
                        openSet.push(neighbour);
                    }
                }
            });
        }
    }

    retracePath(start, target){
        let path = [];
        let currentTile = target;

        while (currentTile != start){
            path.push(currentTile);
            currentTile = currentTile.parent;
        }

        return path.reverse();
    }

    getNeighbours(tile){
        let neighbours = [];

        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++){
                if (x == 0 && y == 0)
                    continue;

                let checkX = tile.coord[0] + x;
                let checkY = tile.coord[1] + y;

                if (checkX >= 0 && checkX < this.width && checkY >= 0 && checkY < this.height){
                    neighbours.push(this.grid[[checkX, checkY]]);
                }
            }
        }

        return neighbours;
    }

    getDistance(tileA, tileB){
        let distX = Math.abs(tileA.coord[0] - tileB.coord[0]);
        let distY = Math.abs(tileA.coord[1] - tileB.coord[1]);

        if (distX > distY){
            return 14 * distY + 10 * (distX - distY);
        }
        return 14 * distX + 10 * (distY - distX);
    }
}

module.exports = Pathfinder;