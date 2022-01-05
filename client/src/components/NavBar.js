import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LOBBIES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import logo from "../assets/logo.png";
import {Context} from "../index";

const NavBar = observer(() => {
    const {user} = useContext(Context);

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