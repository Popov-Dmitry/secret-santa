import React from 'react';
import {FormCheck} from "react-bootstrap";

const MyFormCheck = ({checked, onChange}) => {
    return (
        <FormCheck
            className="fs-5"
            type={"switch"}
            checked={checked}
            onChange={onChange}
        />
    );
};

export default MyFormCheck;