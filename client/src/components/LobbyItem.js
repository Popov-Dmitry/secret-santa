import React from 'react';
import {useHistory} from "react-router-dom";
import {LOBBIES_ROUTE} from "../utils/consts";
import {Card, Col} from "react-bootstrap";

const LobbyItem = ({lobby}) => {
    const history = useHistory();

    return (
        <Col md={2} className={"mt-3"}>
            <Card className="p-2 shadow" style={{cursor: 'pointer'}} border={"light"}
                  onClick={() => history.push(LOBBIES_ROUTE + '/' + lobby.id)}>
                <div className="text-black mt-1 text-center">
                    {lobby.title.length > 36 ?
                        <div>{lobby.title.substring(0, 36)}...</div>
                        :
                        <div>{lobby.title}</div>
                    }
                    {lobby.description.length > 55 ?
                        <div className="opacity-75 mt-1" style={{fontSize: "14px"}}>
                            {lobby.description.substring(0, 55)}...
                        </div>
                        :
                        <div className="opacity-75 mt-1" style={{fontSize: "14px"}}>
                            {lobby.description}
                        </div>
                    }
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