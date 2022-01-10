import {makeAutoObservable} from "mobx";
import {fetchById, refreshToken} from "../http/userApi";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        let userId = localStorage.getItem("userId");
        if (userId) {
            this._isAuth = true;
            fetchById(userId).then(({data, status}) => {
                if (status === 200) {
                    this.setUser(data);
                    this.setIsAuth(true);
                }
                else {
                    localStorage.clear();
                    this._isAuth = false;
                    this._user = {};
                }
                return data;
            }).then(dat => {
                refreshToken(dat.id, dat.email).then(({data, status}) => {
                    if (status === 200) {
                        localStorage.setItem("token", data.token);
                    }
                    else {
                        localStorage.clear();
                        this._isAuth = false;
                        this._user = {};
                    }
                }).catch(() => {
                    localStorage.clear();
                    this.setUser({});
                    this.setIsAuth(false);
                })
            }).catch(() => {
                localStorage.clear();
                this.setUser({});
                this.setIsAuth(false);
            });
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