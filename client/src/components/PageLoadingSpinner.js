import React from 'react';
import {Spinner} from "react-bootstrap";

const PageLoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Spinner animation={"border"} variant={"primary"}/>
        </div>
    );
};

export default PageLoadingSpinner;