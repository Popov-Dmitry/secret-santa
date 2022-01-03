import {$host} from "./index";
import {ADD_USER, FETCH_USERS, LOGIN_USER} from "../utils/endpoints";

export const registration = async (email, password, fullName) => {
    const {data, status, statusText} = await $host.post(ADD_USER, {email, password, fullName});
    return {data, status, statusText};
}

export const login = async (email, password) => {
    const {data, status, statusText} = await $host.post(LOGIN_USER, {email, password});
    return {data, status, statusText};
}

export const fetchById = async (id) => {
    const {data, status, statusText} = await $host.get(FETCH_USERS + "/" + id);
    return {data, status, statusText};
}