import {$authHost, $host} from "./index";
import {ADD_USER, FETCH_USERS, LOGIN_USER, REFRESH_TOKEN, UPDATE_USER} from "../utils/endpoints";

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

export const refreshToken = async (id, email) => {
    const {data, status, statusText} = await $authHost.post(REFRESH_TOKEN, {id, email});
    return {data, status, statusText};
}

export const update = async (id, email, fullName, password) => {
    const {data, status, statusText} = await $authHost.patch(UPDATE_USER + "/" + id, {email, fullName, password});
    return {data, status, statusText};
}