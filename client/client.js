import { io } from "socket.io-client";
import { State } from "./state";

export class Client {
    sock
    stateListeners = []
    state

    constructor(state) {
        this.state = state

        this.sock = io( process.env.SERVER_HOST || "http://localhost:8080" );

        // Create listeners
        this.sock.on("connect", () => {
            console.log(this.sock.id);
            this.message("client", {
                "status":"connected"
            })
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
        obj.clientID = this.state.getUserID()
        console.log("sent on channel \"" + channel + "\" with data", obj)
        this.sock.emit(channel, obj);
    }

    // Takes a function like func(obj)
    stateListener(func) {
        this.stateListeners.push(func)
    }

    clearListeners() {
        this.stateListeners = []
    }
}