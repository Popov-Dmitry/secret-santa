import {
    CREATE_LOBBY_ROUTE,
    LOBBIES_ROUTE,
    LOBBY_INVITE_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MY_LOBBIES_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Main from "./pages/Main";
import Lobbies from "./pages/Lobbies";
import Auth from "./pages/Auth";
import Lobby from "./pages/Lobby";
import Invite from "./pages/Invite";
import MyGames from "./pages/MyGames";
import CreateGame from "./pages/CreateGame";

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
    },
    {
        path: LOBBY_INVITE_ROUTE + "/:id",
        Component: Invite
    }
];

export const authRoutes = [
    {
        path: MY_LOBBIES_ROUTE,
        Component: MyGames
    },
    {
        path: CREATE_LOBBY_ROUTE,
        Component: CreateGame
    },
    {
        path: LOBBIES_ROUTE + "/:id",
        Component: Lobby
    },

];