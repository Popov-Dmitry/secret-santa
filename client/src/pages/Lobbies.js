import React, {useContext, useEffect} from 'react';
import {fetchAllPublic} from "../http/lobbyApi";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import LobbiesList from "../components/LobbiesList";

const Lobbies = observer(() => {
    const {lobbies} = useContext(Context);

    useEffect(() => {
        fetchAllPublic().then(({data, status, statusText}) => {
            if (status === 200) {
                lobbies.setLobbies(data);
            }
            else {
                alert(statusText + "\n" + data);
            }
        });
    }, []);

    return (
        <Container>
            <LobbiesList lobbies={lobbies.lobbies}/>
        </Container>
    );
});

export default Lobbies;