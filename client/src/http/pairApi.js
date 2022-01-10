import {$authHost} from "./index";
import {FETCH_PAIR_BY_FROM_ID, FETCH_PAIRS_BY_LOBBY_ID, PAIR_UP} from "../utils/endpoints";

export const pairUp = async (lobbyId) => {
    const {data, status, statusText} = await $authHost.post(PAIR_UP, {lobbyId});
    return {data, status, statusText};
}

export const fetchByFromId = async (fromId) => {
    const {data, status, statusText} = await $authHost.get(FETCH_PAIR_BY_FROM_ID + "/" + fromId);
    return {data, status, statusText};
}

export const fetchPairsByLobbyId = async (lobbyId) => {
    const {data, status, statusText} = await $authHost.get(FETCH_PAIRS_BY_LOBBY_ID + "/" + lobbyId);
    return {data, status, statusText};
}