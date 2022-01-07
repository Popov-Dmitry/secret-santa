import React from 'react';
import {Col, Row} from "react-bootstrap";
import GiftPrice from "./GiftPrice";

const PairedLobby = ({lobby, pair}) => {
    return (
        <Row>
            <Col md={10}>
                <div className="fs-4">Вот информация о том, кому тебе нужно подготовить подарок:</div>
                <div className="fs-5 mt-2">Адрес: {pair.to.address}</div>
                <div className="fs-5 mt-2">Пожелания: {pair.to.wishes}</div>
            </Col>
            <Col md={2}>
                <div className="d-flex justify-content-end">
                    <GiftPrice price={lobby.price.gift_price} currency={lobby.price.currency}/>
                </div>
            </Col>
        </Row>
    );
};

export default PairedLobby;