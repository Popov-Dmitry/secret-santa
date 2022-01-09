import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Image} from "react-bootstrap";
import logo from "../assets/logo.png";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import "../styles/App.css";
import {LOBBIES_ROUTE} from "../utils/consts";
import {fetchTotalCount} from "../http/participantApi";
import PageLoadingSpinner from "../components/PageLoadingSpinner";

const Main = () => {
    const {user} = useContext(Context);
    const [santasCount, setSantasCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTotalCount().then(({data}) => setSantasCount(data.count))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            {isLoading ?
                <PageLoadingSpinner/>
                :
                <div>
                    <div className="light-grey-to-white-background">
                        <Container>
                            <div className="d-flex justify-content-center align-items-center p-4">
                                <h4 className="text-end m-4">
                                    Организуй тайный обмен подарками <br/> между друзьями или коллегами!
                                </h4>
                                <Image src={logo} width="200px" height="200px" className="m-4 santa"/>
                            </div>
                        </Container>
                    </div>

                    <Container>
                        <div className="d-flex justify-content-center align-items-center">
                            <Button
                                variant={"danger"}
                                size={"lg"}
                                style={{marginRight: "1rem", width: "180px"}}
                            >
                                Создать игру
                            </Button>
                            <Button
                                variant={"primary"}
                                size={"lg"}
                                style={{marginLeft: "1rem", width: "180px"}}
                                href={LOBBIES_ROUTE}
                            >
                                Открытые игры
                            </Button>
                        </div>

                        <h2 className="text-center mt-5">
                            Создай игру
                            <span className="text-danger"> бесплатно </span>
                            всего в
                            <span className="text-danger"> пару кликов</span>!
                        </h2>

                        <div className="mt-5">
                            <div className="d-flex mb-2">
                                <div className="d-flex flex-column align-items-center">
                                    <div className="step text-light">1</div>
                                    <div className="fs-5 w-50 text-center">Заполни информацию об игре</div>
                                </div>
                                <Image src={step1} width="70%" height="70%"/>
                            </div>
                            <div className="d-flex mb-2">
                                <Image src={step2} width="70%" height="70%"/>
                                <div className="d-flex flex-column align-items-center">
                                    <div className="step text-light">2</div>
                                    <div className="fs-5 w-50 text-center">Пригласи других людей</div>
                                </div>
                            </div>
                            <div className="d-flex mb-2">
                                <div className="d-flex flex-column align-items-center">
                                    <div className="step text-light">3</div>
                                    <div className="fs-5 w-50 text-center">Распредели участников на пары</div>
                                </div>
                                <Image src={step3} width="70%" height="70%"/>
                            </div>
                        </div>
                    </Container>

                    <div className="white-to-light-grey-background">
                        <Container>
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <h2>
                                    {santasCount} сант уже участвуют,
                                    <span className="text-danger"> присоединяйся</span>!
                                </h2>
                            </div>
                        </Container>
                    </div>
                </div>
            }
        </div>
    );
};

export default Main;