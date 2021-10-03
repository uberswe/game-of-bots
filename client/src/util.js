export function coordToPos(x, y, tileSize) {
    let pos = [];
    pos[0] = x * tileSize[0] + tileSize[0] / 2;
    pos[1] = y * tileSize[1] + tileSize[1] / 2;
    return pos;
}