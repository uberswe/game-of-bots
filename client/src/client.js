class Client {
    sock
    stateListeners = []

    run() {
        this.sock = io();

        // Create listeners
        this.sock.on("connect", () => {
            console.log(this.sock.id);
        });

        this.sock.on("disconnect", () => {
            console.log(this.sock.id);
        });

        this.sock.on("state", (obj) => {
            this.stateListeners.forEach(function (func) {
            try{
                func(obj)
            } catch(e) {
                console.log(e)
            }
            })
        })
    }

    message(channel, obj) {
        console.log("sent on channel \"" + channel + "\" with data", obj)
        this.sock.emit(channel, obj);
    }

    // Takes a function like func(obj)
    stateListener(func) {
        this.stateListeners.push(func)
    }
}