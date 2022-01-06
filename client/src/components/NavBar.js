import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Form, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LOBBIES_ROUTE, LOBBY_INVITE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import {Context} from "../index";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const [inviteCode, setInviteCode] = useState("");
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.clear();
    };

    return (
        <Navbar bg={"light"} variant={"light"}>
            <Container>
                <Navbar.Brand href={MAIN_ROUTE}>
                    ТАЙНЫЙ САНТА <Image src={logo} width="30px" height="30px"/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={LOBBIES_ROUTE}>Открытые игры</Nav.Link>
                </Nav>

                <div className="me-auto">
                    <Form className="d-flex justify-content-center">
                        <Form.Control style={{borderRadius: "30px"}}
                            type="search"
                            value={inviteCode}
                            onChange={e => setInviteCode(e.target.value)}
                            placeholder="Код приглашения"
                            className="me-2"
                        />
                        <Button
                            variant={"light"}
                            className="m-0 p-0"
                            onClick={() => history.push(LOBBY_INVITE_ROUTE + "/" + inviteCode)}
                        >
                            <Image src={search} height="20px" width="20px"/>
                        </Button>
                    </Form>
                </div>
                <Nav>
                    {user.isAuth ?
                        <Nav>
                            <Nav.Link>Создать игру</Nav.Link>
                            <Nav.Link>Мои игры</Nav.Link>
                            <NavDropdown title={user.user.full_name}>
                                <Nav.Link href={"/account"}>Настройки</Nav.Link>
                                <Nav.Link onClick={logOut}>Выход</Nav.Link>
                            </NavDropdown>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link href={REGISTRATION_ROUTE}>Регистрация</Nav.Link>
                            <Nav.Link href={LOGIN_ROUTE}>Вход</Nav.Link>
                        </Nav>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;