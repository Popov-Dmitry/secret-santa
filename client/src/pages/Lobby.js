import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchById} from "../http/lobbyApi";
import {Container} from "react-bootstrap";
import {Context} from "../index";
import {fetchByLobbyId} from "../http/participantApi";
import {fetchPairsByLobbyId} from "../http/pairApi";
import {observer} from "mobx-react-lite";
import "../styles/App.css";
import PairedLobby from "../components/lobby/PairedLobby";
import GatheringLobby from "../components/lobby/GatheringLobby";

const Lobby = observer(() => {
    const {id} = useParams();
    const {user} = useContext(Context);
    const [lobby, setLobby] = useState({owner: {}, price: {}});
    const [participants, setParticipants] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [pair, setPair] = useState({from: {}, to: {}});

    useEffect(() => {
        fetchById(id).then(({data, status, statusText}) => {
            if (status === 200) {
                setLobby(data);
            } else {
                alert(statusText + "\n" + data);
            }
        });
        fetchByLobbyId(id).then(({data, status, statusText}) => {
            if (status === 200) {
                setParticipants(data);
            } else {
                alert(statusText + "\n" + data);
            }
        });
        fetchPairsByLobbyId(id).then(({data, status, statusText}) => {
            if (status === 200) {
                setPairs(data);
                if (pairs.length !== 0) {
                    setPair(pairs.filter(pair => pair.from.id !== user.user.id)[0]);
                }
            } else {
                alert(statusText + "\n" + data);
            }
        });
    }, []);

    return (
        <Container>
            {participants.some(participant => participant.id === user.user.id) || lobby.owner.userId === user.user.id ?
                <div>
                    <h1 className="text-center mt-2">
                        {lobby.title}
                    </h1>
                    <div className="text-center fs-5">
                        {lobby.description}
                    </div>
                    <hr/>
                    {pairs.length === 0 ?
                        <GatheringLobby
                            lobby={lobby}
                            participants={participants}
                            setParticipants={setParticipants}
                            pairs={pairs}
                            setPairs={setPairs}
                            setPair={setPair}
                        />
                        :
                        <PairedLobby lobby={lobby} pair={pair}/>
                    }
                </div>
                :
                <div
                    className="d-flex justify-content-center align-items-center fs-2 text-center"
                    style={{height: window.innerHeight - 60}}
                >
                    Это закрытая игра. <br/>
                    Для участия попросите код приглашения у создателя игры.
                </div>
            }

        </Container>
    );
});

export default Lobby;