import {$authHost, $host} from "./index";
import {
    ADD_PARTICIPANT, DELETE_PARTICIPANT_BY_ID,
    FETCH_PARTICIPANTS,
    FETCH_PARTICIPANTS_BY_LOBBY_ID,
    FETCH_TOTAL_PARTICIPANTS_COUNT
} from "../utils/endpoints";

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

export const fetchTotalCount = async () => {
    const {data, status, statusText} = await $host.get(FETCH_TOTAL_PARTICIPANTS_COUNT);
    return {data, status, statusText};
}

export const deleteById = async (id) => {
    const {data, status, statusText} = await $authHost.delete(DELETE_PARTICIPANT_BY_ID + "/" + id);
    return {data, status, statusText};
}