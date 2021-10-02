class Resource {
    constructor(id) {
        this.id = id; // unique int
        this.value = 5;
    }

    getValue(){
        return this.value;
    }
}

module.exports = Resource;