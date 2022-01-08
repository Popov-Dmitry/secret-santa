import React, {useContext} from 'react';
import {Button, Col, Image, Row} from "react-bootstrap";
import santa from "../../assets/santa-claus.png";
import LobbyInviteCode from "./LobbyInviteCode";
import ParticipantsList from "./ParticipantsList";
import {pairUp} from "../../http/pairApi";
import {Context} from "../../index";
import GiftPrice from "./GiftPrice";

const GatheringLobby = ({lobby, participants, setParticipants, pairs, setPair, setPairs}) => {
    const {user} = useContext(Context);

    const pairUpClick = async () => {
        if (participants.length % 2 !== 0) {
            alert("Число участников должно быть четным!");
            return;
        }
        const {data, status, statusText} = await pairUp(lobby.id);
        if (status === 200) {
            setPairs(data);
            if (pairs.length !== 0) {
                setPair(pairs.filter(pair => pair.from.id !== user.user.id)[0]);
            }
        }
    }

    return (
        <Row>
            <Col md={10}>
                <div>
                    {participants.length === 0 ?
                        <h3>Участников еще нет, пригласите кого-нибудь!</h3>
                        :
                        <div>
                            <h3>
                                <Image src={santa} width="50px" height="50px"/> Участники ({participants.length}):
                            </h3>
                            <ParticipantsList
                                participants={participants}
                                setParticipants={setParticipants}
                                lobby={lobby}
                            />
                            {user.user.id === lobby.owner.userId &&
                                <Button
                                    variant={"success"}
                                    className="mt-4"
                                    onClick={pairUpClick}
                                >
                                    Распределить участников
                                </Button>
                            }
                        </div>
                    }
                </div>
            </Col>
            <Col md={2}>
                <div className="d-flex justify-content-end">
                    <GiftPrice price={lobby.price.gift_price} currency={lobby.price.currency}/>
                </div>
                {user.user.id === lobby.owner.userId &&
                    <LobbyInviteCode inviteCode={lobby.invite_code}/>
                }
                <div className="text-center opacity-0" id="copy">Скопировано!</div>
            </Col>
        </Row>
    );
};

export default GatheringLobby;