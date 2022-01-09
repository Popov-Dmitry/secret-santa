import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Form, Spinner} from "react-bootstrap";
import MyFormLabel from "../components/MyFormLabel";
import {observer} from "mobx-react-lite";
import {update} from "../http/userApi";
import PageLoadingSpinner from "../components/PageLoadingSpinner";

const Account = observer(() => {
    const {user} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    if (user.user.email && isLoading) {
        setIsLoading(false);
        setEmail(user.user.email);
        setFullName(user.user.full_name);
    }

    const save = async () => {
        if (email.trim().length === 0 || fullName.trim().length === 0) {
            alert("Поля не могут быть пустыми");
            return;
        }
        const {data} = await update(user.user.id, email, fullName, password);
        user.setUser(data);
    }

    return (
        <Container>
            {isLoading ?
                <PageLoadingSpinner/>
                :
                <Form className="w-50 mt-2">
                    <MyFormLabel text={"Email"}/>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <MyFormLabel text={"Полное имя"}/>
                    <Form.Control
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                    <MyFormLabel text={"Новый пароль"}/>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        className="mt-4"
                        variant={"success"}
                        onClick={save}
                    >
                        Сохранить
                    </Button>
                </Form>
            }
        </Container>
    );
});

export default Account;