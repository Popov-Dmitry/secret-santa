import {$authHost, $host} from "./index";
import {ADD_PARTICIPANT, FETCH_PARTICIPANTS, FETCH_PARTICIPANTS_BY_LOBBY_ID} from "../utils/endpoints";

export const add = async (wishes, address, userId, lobbyId) => {
    const {data, status, statusText} = await $authHost.post(ADD_PARTICIPANT, {wishes, address, userId, lobbyId});
    return {data, status, statusText};
}

export const fetchById = async (id) => {
    const {data, status, statusText} = await $authHost.get(FETCH_PARTICIPANTS + "/" + id);
    return {data, status, statusText};
}

export const fetchByLobbyId = async (lobbyId) => {
    const {data, status, statusText} = await $host.get(FETCH_PARTICIPANTS_BY_LOBBY_ID + "/" + lobbyId);
    return {data, status, statusText};
}