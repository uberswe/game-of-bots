export class SessionStorage {
    sessionStorage

    constructor() {
        this.sessionStorage = window.sessionStorage;
    }

    set(key, value) {
        this.sessionStorage.setItem(key, value);
    }

    get(key) {
        return this.sessionStorage.getItem(key);
    }

    has(key) {
        return !(this.sessionStorage.getItem(key) == null)
    }

    remove(key) {
        this.sessionStorage.removeItem(key)
    }

    clearAll() {
        this.sessionStorage.clear()
    }
}