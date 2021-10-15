import { uuidv4 } from "./util";
import { SessionStorage } from "./sessionstorage";

export class State {
    static CLIENT_IDENTIFIER = "client_id"
    clientId
    storage

    constructor() {
        this.storage = new SessionStorage()
        if (this.storage.has(self.CLIENT_IDENTIFIER)) {
            this.clientId = this.storage.get(self.CLIENT_IDENTIFIER)
        } else {
            // Generate a new uuidv4
            this.clientId = uuidv4()
            this.storage.set(self.CLIENT_IDENTIFIER, this.clientId)
        }
    }

    setUserID(clientId) {
        this.clientId = clientId
    }

    getUserID() {
        return this.clientId
    }


}