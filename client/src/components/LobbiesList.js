import React from 'react';
import {Row} from "react-bootstrap";
import LobbyItem from "./LobbyItem";
import {observer} from "mobx-react-lite";

const LobbiesList = observer(({lobbies}) => {
    return (
        <Row className="d-flex">
            {lobbies.length === 0 ?
                <div className="text-black-50 d-flex justify-content-center align-items-center display-5"
                     style={{height: window.innerHeight - 60}}
                >
                    Игры не найдены
                </div>
                :
                lobbies.map(lobby =>
                    <LobbyItem key={lobby.id} lobby={lobby}/>
                )
            }
        </Row>
    );
});

export default LobbiesList;