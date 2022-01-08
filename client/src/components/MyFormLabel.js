import React from 'react';
import {FormLabel} from "react-bootstrap";

const MyFormLabel = ({text}) => {
    return (
        <FormLabel className="fs-5 mt-3">
            {text}
        </FormLabel>
    );
};

export default MyFormLabel;