import React from 'react';
import {useHistory} from "react-router-dom";
import {LOBBIES_ROUTE} from "../utils/consts";
import {Card, Col} from "react-bootstrap";

const LobbyItem = ({lobby}) => {
    const history = useHistory();

    return (
        <Col md={2} className={"mt-3"}>
            <Card className="p-2 shadow" style={{width: 150, cursor: 'pointer'}} border={"light"}
                  onClick={() => history.push(LOBBIES_ROUTE + '/' + lobby.id)}>
                <div className="text-black mt-1 d-flex justify-content-between align-items-center">
                    <div>{lobby.title}</div>
                    <div className="d-flex align-items-center">
                        <div>{lobby.description}</div>
                    </div>
                </div>
                <hr/>
                <div className="text-black-50 mb-1 text-lg-center">
                    {lobby.price ?
                        <div>До {lobby.price.gift_price} {lobby.price.currency}</div>
                        :
                        <div>Стоимость подарков не указана</div>
                    }
                </div>
            </Card>
        </Col>
    );
};

export default LobbyItem;