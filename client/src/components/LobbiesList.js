import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../index";
import LobbyItem from "./LobbyItem";
import {observer} from "mobx-react-lite";

const LobbiesList = observer(() => {
    const {lobbies} = useContext(Context);

    return (
        <Row className="d-flex">
            {lobbies.lobbies.length === 0 ?
                <div className="text-black-50 d-flex justify-content-center align-items-center display-5"
                     style={{height: window.innerHeight}}
                >
                    Не найдены открытые игры
                </div>
                :
                lobbies.lobbies.map(lobby =>
                    <LobbyItem key={lobby.id} lobby={lobby}/>
                )
            }

        </Row>
    );
});

export default LobbiesList;