export function coordToPos(x, y, tileSize) {
    let pos = [];
    pos[0] = x * tileSize[0] + tileSize[0] / 2;
    pos[1] = y * tileSize[1] + tileSize[1] / 2;
    return pos;
}

export function stateAdapter(obj) {
    let gridSize = obj[0]
    if (gridSize == null) {
        gridSize = 25
    }
    let resources = []
    obj[3].forEach(function (pair) {
        if (Array.isArray(pair)) {
            let pairArr = pair[0].split(',');
            if (pairArr.length === 2) {
                resources.push({
                    x:pairArr[0],
                    y:pairArr[1]
                });
            }
        }
    })
    let bots = []
    obj[4].forEach(function (pair) {
        if (Array.isArray(pair)) {
            let pairArr = pair[0].split(',');
            if (pairArr.length === 2) {
                bots.push({
                    x:pairArr[0],
                    y:pairArr[1]
                });
            }
        }
    })
    return {
        gridSize: gridSize,
        turn: obj[1],
        maxTurns: obj[2],
        resources: resources,
        bots: bots
    }
}