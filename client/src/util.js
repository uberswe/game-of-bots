export function coordToPos(x, y, tileSize) {
    let pos = [];
    pos[0] = x * tileSize[0] + tileSize[0] / 2;
    pos[1] = y * tileSize[1] + tileSize[1] / 2;
    return pos;
}

// From https://stackoverflow.com/a/2117523/1260548
export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}