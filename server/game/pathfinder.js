class Pathfinder {
    constructor(){

    }

    calculatePath(pos, dest){
        // Find the path from position to their destination
        let path = [];

        for (let y = pos[1]; y > dest[1]; y--){
            path.push([pos[0], y]);
        }

        return path;
    }
}

module.exports = Pathfinder;