import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import LobbyStore from "./store/LobbyStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        lobbies: new LobbyStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

