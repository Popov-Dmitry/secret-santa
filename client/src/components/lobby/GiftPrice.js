import React from 'react';
import {Image} from "react-bootstrap";
import money from "../../assets/money.png";

const GiftPrice = ({price}) => {
    return (
        <div>
            <Image src={money} width="35px" height="35px"/> &nbsp;
            {price?
                <span className="fs-5">до {price.gift_price} {price.currency}</span>
                :
                <span className="fs-5">не указано</span>
            }

        </div>
    );
};

export default GiftPrice;