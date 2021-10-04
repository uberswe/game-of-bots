export class SessionStorage {
    sessionStorage

    constructor() {
        this.sessionStorage = window.sessionStorage;
    }

    set(key, value) {
        this.sessionStorage.setItem(key, value);
    }

    get(key) {
        this.sessionStorage.getItem(key);
    }

    remove(key) {
        this.sessionStorage.removeItem(key)
    }

    clearAll() {
        this.sessionStorage.clear()
    }
}