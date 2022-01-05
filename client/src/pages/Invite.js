import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Card, Container, Image} from "react-bootstrap";
import {fetchByInviteCode} from "../http/lobbyApi";
import {NavLink, useHistory, useParams} from "react-router-dom";
import {fetchById} from "../http/userApi";
import {LOBBIES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {fetchByLobbyId} from "../http/participantApi";
import NewParticipant from "../components/modals/NewParticipant";
import money from "../assets/money.png";
import santa from "../assets/santa-claus.png";

const Invite = () => {
    const {user} = useContext(Context);
    const {id} = useParams();
    const [lobby, setLobby] = useState({owner: {}, price: {}});
    const [owner, setOwner] = useState({});
    const [participants, setParticipants] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetchByInviteCode(id).then(({data, status, statusText}) => {
            if (status === 200) {
                setLobby(data);
            } else {
                alert("Не найдена игра по коду приглашения " + id);
            }
            return data;
        }).then((dat) => {
            fetchById(dat.owner.userId).then(({data, status, statusText}) => {
                if (status === 200) {
                    setOwner(data);
                } else {
                    alert(statusText + "\n" + data);
                }
            });
            fetchByLobbyId(dat.id).then(({data, status, statusText}) => {
                if (status === 200) {
                    setParticipants(data);
                } else {
                    alert(statusText + "\n" + data);
                }
            });
        });
    }, []);

    // if (participants.some(participant => participant.user.id === user.user.id)) {
    //     history.push(LOBBIES_ROUTE + "/" + lobby.id)
    // }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight}}
        >
            <Card className="d-flex justify-content-center align-items-center p-2 shadow w-50 h-25" border={"light"}>
                <div>
                    {user.isAuth ?
                        <div>
                            <div className="fw-bold mb-4">{owner.full_name} пригласил вас для игры в тайного санту!</div>
                            <div className="d-flex justify-content-between m-2">
                                <div>
                                    <Image src={money} width="30px" height="30px"/> до {lobby.price.gift_price} {lobby.price.currency}
                                </div>
                                <div>
                                    <Image src={santa} width="30px" height="30px"/> {participants.length}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between m-2 mt-4">
                                <Button variant={"success"} onClick={() => setModalVisible(true)}>Принять</Button>
                                <Button variant={"danger"} onClick={() => history.push(MAIN_ROUTE)}>Отклонить</Button>
                            </div>
                        </div>
                        :
                        <div className="d-flex flex-column align-items-center">
                            <div>Вас пригласили для игры в тайного санту!</div>
                            <div>
                                Чтобы принять участие необходимо <NavLink to={LOGIN_ROUTE}>войти</NavLink> или <NavLink to={REGISTRATION_ROUTE}>зарегистрироваться</NavLink>
                            </div>
                        </div>
                    }
                </div>
            </Card>
            <NewParticipant
                show={modalVisible}
                onHide={() => setModalVisible(false)}
                userId={user.user.id}
                lobbyId={lobby.id}
            />
        </Container>
    );
};

export default Invite;