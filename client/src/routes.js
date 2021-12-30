import {LOBBIES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Main from "./pages/Main";
import Lobbies from "./pages/Lobbies";
import Auth from "./pages/Auth";
import Lobby from "./pages/Lobby";

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOBBIES_ROUTE,
        Component: Lobbies
    }
];

export const authRoutes = [
    {
        path: LOBBIES_ROUTE + "/:id",
        Component: Lobby
    }
];