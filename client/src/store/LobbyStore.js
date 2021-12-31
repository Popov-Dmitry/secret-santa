import {makeAutoObservable} from "mobx";

export default class LobbyStore {
    constructor() {
        this._lobbies = {}
        makeAutoObservable(this);
    }

    setLobbies(lobbies) {
        this._lobbies = lobbies;
    }

    get lobbies() {
        return this._lobbies;
    }
}