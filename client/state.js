import { uuidv4 } from "./util";
import { SessionStorage } from "./sessionstorage";

export class State {
    static CLIENT_IDENTIFIER = "client_id"
    static GAME_IS_RUNNING = "game_is_running"
    clientId
    gameIsRunning
    storage

    constructor() {
        this.storage = new SessionStorage()
        this.clientId = this.getFieldValue(State.CLIENT_IDENTIFIER, uuidv4())
        this.gameIsRunning = this.getFieldValue(State.GAME_IS_RUNNING, "false")
    }

    getFieldValue(name, defaultValue) {
        if (this.storage.has(name)) {
            return this.storage.get(name)
        } else {
            this.storage.set(name, defaultValue)
            return defaultValue
        }
    }

    setUserID(clientId) {
        this.clientId = clientId
        console.log(State.CLIENT_IDENTIFIER, clientId)
        this.storage.set(State.CLIENT_IDENTIFIER, clientId)
    }

    getUserID() {
        return this.clientId
    }

    setGameIsRunning(gameIsRunning) {
        this.gameIsRunning = gameIsRunning
        console.log(State.GAME_IS_RUNNING, gameIsRunning)
        this.storage.set(State.GAME_IS_RUNNING, gameIsRunning)
    }

    getGameIsRunning() {
        console.log(State.GAME_IS_RUNNING, this.gameIsRunning)
        return this.gameIsRunning
    }


}