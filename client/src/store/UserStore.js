import {makeAutoObservable} from "mobx";
import {fetchById} from "../http/userApi";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        let userId = localStorage.getItem("userId");
        if (userId) {
            fetchById(userId).then(({data}) => this._user = data);
        }
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}