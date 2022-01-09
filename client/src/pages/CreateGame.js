import React, {useContext, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {Context} from "../index";
import MyFormLabel from "../components/MyFormLabel";
import MyFormCheck from "../components/MyFormCheck";
import {create} from "../http/lobbyApi";
import {useHistory} from "react-router-dom";
import {add} from "../http/participantApi";
import {LOBBIES_ROUTE} from "../utils/consts";

const CreateGame = () => {
    const {user} = useContext(Context);
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    const [isMaxPrice, setIsMaxPrice] = useState(false);
    const [maxPrice, setMaxPrice] = useState("0");
    const [currency, setCurrency] = useState("руб.");
    const [isParticipate, setIsParticipate] = useState(false);
    const [wishes, setWishes] = useState("");
    const [address, setAddress] = useState("");

    const enableMaxPrice = (e) => {
        setIsMaxPrice(e.target.checked);
        if (e.target.checked) {
            document.getElementById("max").classList.remove("text-black-50");
        }
        else {
            document.getElementById("max").classList.add("text-black-50");
        }
    }

    const createLobby = async () => {
        if (title.trim().length === 0) {
            alert("Название игры не должно быть пустым");
            return;
        }
        if (isMaxPrice && maxPrice < 0) {
            alert("Сумма стоимости подарков должна быть положительной");
            return;
        }
        if (isParticipate && (wishes.trim().length === 0 || address.trim().length === 0)) {
            alert("Заполните пожелания к подарку и свой адрес");
            return;
        }
        let res;
        if (isMaxPrice) {
            res = await create(title, description, isPrivate, user.user.id, maxPrice, currency);
        }
        else {
            res = await create(title, description, isPrivate, user.user.id, null, null);
        }
        if (res.status === 201) {
            if (isParticipate) {
                await add(wishes, address, user.user.id, res.data.id);
            }
            history.push(LOBBIES_ROUTE + "/" + res.data.id);
        }
        else {
            alert("Что-то пошло не так");
        }
    }

    return (
        <Container>
            <Form className="w-50 mt-2">
                <MyFormLabel text={"Придумайте название игры:"}/>
                <Form.Control
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder={"Название игры"}
                />
                <MyFormLabel text={"Напишите описание игры:"}/>
                <Form.Control
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder={"Описание игры"}
                />
                <MyFormLabel text={"Вход только по приглашениям"}/>
                <MyFormCheck
                    checked={isPrivate}
                    onChange={e => setIsPrivate(e.target.checked)}
                />
                <MyFormLabel text={"Ограничить максимальную стоимость подарков"}/>
                <MyFormCheck
                    checked={isMaxPrice}
                    onChange={enableMaxPrice}
                />
                <div className="d-flex justify-content-between w-50 text-black-50" id="max">
                    <div className="d-flex flex-column">
                        <MyFormLabel text={"Сумма"}/>
                        <Form.Control
                            value={maxPrice}
                            onChange={e => setMaxPrice(e.target.value)}
                            disabled={!isMaxPrice}
                            type={"number"}
                            placeholder={"Максимальная сумма"}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <MyFormLabel text={"Валюта"}/>
                        <Form.Select
                            value={currency}
                            onChange={e => setCurrency(e.target.value)}
                            disabled={!isMaxPrice}
                        >
                            <option value="руб.">руб.</option>
                            <option value="грн.">грн.</option>
                            <option value="тенге">тенге</option>
                            <option value="евро">евро</option>
                            <option value="дол.">дол.</option>
                        </Form.Select>
                    </div>
                </div>
                <MyFormLabel text="Участуете ли вы в игре"/>
                <MyFormCheck
                    checked={isParticipate}
                    onChange={e => setIsParticipate(e.target.checked)}
                />
                {isParticipate &&
                    <div>
                        <MyFormLabel text={"Напишите свои пожелания к подарку:"}/>
                        <Form.Control
                            value={wishes}
                            onChange={e => setWishes(e.target.value)}
                            placeholder="Ваши пожелания"
                        />
                        <MyFormLabel text={"Напишите адрес для получения подарка:"}/>
                        <Form.Control
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Ваш адрес"
                        />
                    </div>
                }
                <Button
                    className="mt-4"
                    size={"lg"}
                    variant={"success"}
                    onClick={createLobby}
                >
                    Создать
                </Button>
            </Form>
        </Container>
    );
};

export default CreateGame;