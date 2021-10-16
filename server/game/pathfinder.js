class Pathfinder {
    constructor(){

    }

    calculatePath(pos, dest){
        // Find the path from position to their destination
        let path = [];

        for (let y = pos[1]; y >= dest[1]; y--){
            path.push([pos[0], y]);
        }

        return path;
    }

    /*
    OPEN // set of nodes to be evaluated
    CLOSED // set of nodes already evaluated

    loop
        current = node in OPEN with the lowest f_cost
        remove current from OPEN
        add current to CLOSED

        if current is the target node
            return
        
        foreach neighbour of the current node
            if neighbour is not traversable or neighbour is in CLOSED
                skip to the next neighbour
            
            if new path to neighbour is shorter OR neighbour is not in OPEN
                set f_cost of neighbour
                set parent of neighbour to current
                if neighbour is not in OPEN
                    add neighbour to OPEN
    */
}

module.exports = Pathfinder;