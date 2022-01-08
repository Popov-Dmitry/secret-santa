import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import LobbiesList from "../components/LobbiesList";
import {fetchByOwnerId, fetchByUserId} from "../http/lobbyApi";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {CREATE_LOBBY_ROUTE, LOBBIES_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const MyGames = observer(() => {
    const {user} = useContext(Context);
    const [myLobbiesByUserId, setMyLobbiesByUserId] = useState([]);
    const [myLobbiesByOwnerId, setMyLobbiesByOwnerId] = useState([]);

    useEffect(() => {
        if (user.user.id) {
            fetchByUserId(user.user.id).then(({data}) => setMyLobbiesByUserId(data));
            fetchByOwnerId(user.user.id).then(({data}) => setMyLobbiesByOwnerId(data));
        }
    }, [user.user]);

    return (
        <Container>
            {myLobbiesByUserId.length === 0 && myLobbiesByOwnerId.length === 0 ?
                <div>
                    <div className="fs-4 text-center mt-4">
                        Вы еще нигде не участвуете! <br/>
                        <NavLink to={LOBBIES_ROUTE}>Посмотрите список открытых игр</NavLink> <span>
                        или <NavLink to={CREATE_LOBBY_ROUTE}>создайте свою игру</NavLink>!</span>
                    </div>
                </div>
                :
                <div>
                    {myLobbiesByUserId.length !== 0 &&
                        <div>
                            <div className="fs-5 mt-3">Игры, в которых вы участвуете:</div>
                            <LobbiesList lobbies={myLobbiesByUserId}/>
                            <hr/>
                        </div>
                    }
                    {myLobbiesByOwnerId.length !== 0 &&
                        <div>
                            <div className="fs-5 mt-3">Игры, в которых вы организатор:</div>
                            <LobbiesList lobbies={myLobbiesByOwnerId}/>
                        </div>
                    }
                </div>
            }
        </Container>
    );
});

export default MyGames;