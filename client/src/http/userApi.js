import {$host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password, fullName) => {
    const {data} = await $host.post("/api/users/", {email, password, fullName});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post("/api/users/login", {email, password});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
}