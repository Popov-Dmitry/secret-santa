import React from 'react';
import {Image} from "react-bootstrap";
import money from "../../assets/money.png";

const GiftPrice = ({price, currency}) => {
    return (
        <div>
            <Image src={money} width="35px" height="35px"/> &nbsp;
            <span className="fs-5">до {price} {currency}</span>
        </div>
    );
};

export default GiftPrice;