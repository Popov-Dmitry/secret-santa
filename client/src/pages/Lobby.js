import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {fetchById} from "../http/lobbyApi";
import {Container} from "react-bootstrap";
import {Context} from "../index";
import {fetchByLobbyId} from "../http/participantApi";
import {fetchPairsByLobbyId} from "../http/pairApi";
import {observer} from "mobx-react-lite";
import "../styles/App.css";
import PairedLobby from "../components/lobby/PairedLobby";
import GatheringLobby from "../components/lobby/GatheringLobby";
import {LOBBY_INVITE_ROUTE} from "../utils/consts";
import PageLoadingSpinner from "../components/PageLoadingSpinner";

const Lobby = observer(() => {
    const {id} = useParams();
    const {user} = useContext(Context);
    const [lobby, setLobby] = useState({owner: {}, price: {}});
    const [participants, setParticipants] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [pair, setPair] = useState({from: {}, to: {}});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

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
            } else {
                alert(statusText + "\n" + data);
            }
        });
    }, []);

    useEffect(() => {
        setPair(pairs.filter(pair => pair.from.id !== user.user.id)[0]);
    }, [pairs]);

    if (user.user.id && lobby.id && participants && pairs && isLoading) {
        setIsLoading(false);
        if (!(participants.some(participant => participant.id === user.user.id) || lobby.owner.userId === user.user.id) &&
            !lobby.is_private) {
            history.push(LOBBY_INVITE_ROUTE + "/" + lobby.invite_code);
        }
    }

    return (
        <Container>
            {isLoading ?
                <PageLoadingSpinner/>
                :
                <div>
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
                                <div>
                                    {pair && <PairedLobby lobby={lobby} pair={pair}/>}
                                </div>

                            }
                        </div>
                        :
                        <div>
                            {lobby.is_private &&
                                <div
                                    className="d-flex justify-content-center align-items-center fs-2 text-center"
                                    style={{height: window.innerHeight - 60}}
                                >
                                    ?????? ???????????????? ????????. <br/>
                                    ?????? ?????????????? ?????????????????? ?????? ?????????????????????? ?? ?????????????????? ????????.
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </Container>
    );
});

export default Lobby;