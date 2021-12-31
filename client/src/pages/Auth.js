import React, {useContext, useState} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {Context} from "../index";
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOBBIES_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";

const Auth = () => {
    const {user} = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const click = async () => {
        try {
            let resp;
            if (location.pathname === LOGIN_ROUTE) {
                await login(email, password);
            }
            else {
                await registration(email, password, fullName);
            }
            user.setUser(user);
            user.setIsAuth(true);
            history.push(LOBBIES_ROUTE);
        }
        catch (e) {
            alert("Неверный email или пароль")
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight}}
        >
            <Card
                className="p-2 shadow w-75"
                border={"light"}
                style={{height: "40%"}}
            >
                <h2 className="m-auto">{location.pathname === LOGIN_ROUTE ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mb-2"
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder="Введите пароль"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    {location.pathname === LOGIN_ROUTE ?
                        <div/>
                        :
                        <Form.Control
                            className="mb-2"
                            placeholder="Введите полное имя"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                    }
                    <div className="d-flex justify-content-lg-between">
                        {location.pathname === LOGIN_ROUTE ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {location.pathname === LOGIN_ROUTE ? "Войти" : "Зарегистрироваться"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;