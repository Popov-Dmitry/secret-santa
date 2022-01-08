import {$authHost, $host} from "./index";
import {
    ADD_LOBBY,
    FETCH_LOBBIES,
    FETCH_LOBBIES_BY_INVITE_CODE,
    FETCH_LOBBIES_BY_OWNER_ID,
    FETCH_LOBBIES_BY_USER_ID
} from "../utils/endpoints";

export const create = async (title, description, isPrivate, ownerId, giftPrice, currency) => {
    const {data, status, statusText} = await $authHost.post(ADD_LOBBY, {title, description, isPrivate, ownerId, giftPrice, currency});
    return {data, status, statusText};
}

export const fetchAllPublic = async () => {
    const {data, status, statusText} = await $host.get(FETCH_LOBBIES);
    return {data, status, statusText};
}

export const fetchById = async (id) => {
    const {data, status, statusText} = await $authHost.get(FETCH_LOBBIES + "/" + id);
    return {data, status, statusText};
}

export const fetchByInviteCode = async (inviteCode) => {
    const {data, status, statusText} = await $authHost.get(FETCH_LOBBIES_BY_INVITE_CODE + "/" + inviteCode);
    return {data, status, statusText};
}

export const fetchByOwnerId = async (id) => {
    const {data, status, statusText} = await $authHost.get(FETCH_LOBBIES_BY_OWNER_ID + "/" + id);
    return {data, status, statusText};
}

export const fetchByUserId = async (id) => {
    const {data, status, statusText} = await $authHost.get(FETCH_LOBBIES_BY_USER_ID + "/" + id);
    return {data, status, statusText};
}