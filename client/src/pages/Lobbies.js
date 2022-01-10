import React, {useContext, useEffect, useState} from 'react';
import {fetchAllPublic} from "../http/lobbyApi";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import LobbiesList from "../components/LobbiesList";
import PageLoadingSpinner from "../components/PageLoadingSpinner";

const Lobbies = observer(() => {
    const {lobbies} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAllPublic().then(({data, status, statusText}) => {
            if (status === 200) {
                lobbies.setLobbies(data);
            }
            else {
                alert(statusText + "\n" + data);
            }
        }).finally(() => setIsLoading(false));
    }, []);

    return (
        <Container>
            {isLoading ?
                <PageLoadingSpinner/>
                :
                <LobbiesList lobbies={lobbies.lobbies}/>
            }
        </Container>
    );
});

export default Lobbies;