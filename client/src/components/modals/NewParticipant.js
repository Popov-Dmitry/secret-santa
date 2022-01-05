import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {add} from "../../http/participantApi";
import {useHistory} from "react-router-dom";
import {LOBBIES_ROUTE} from "../../utils/consts";

const NewParticipant = ({show, onHide, userId, lobbyId}) => {
    const [wishes, setWishes] = useState("");
    const [address, setAddress] = useState("");
    const history = useHistory();

    const addParticipant = async () => {
        const {data, status, statusText} = await add(wishes, address, userId, lobbyId);
        if (status === 201) {
            history.push(LOBBIES_ROUTE + "/" + lobbyId);
        }
        else {
            alert(statusText + "\n" + data);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Принять приглашение
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={wishes}
                        onChange={e => setWishes(e.target.value)}
                        placeholder="Введите пожелания"
                    />
                    <Form.Control
                        className="mt-2"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Введите адрес"
                    />
                    <Button
                        className="float-end mt-2"
                        variant={"outline-success"}
                        onClick={addParticipant}
                    >
                        Подтвердить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewParticipant;