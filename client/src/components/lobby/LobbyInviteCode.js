import React from 'react';
import {Button, Card, Image} from "react-bootstrap";
import copy from "../../assets/copy.png";

const LobbyInviteCode = ({inviteCode}) => {

    const copyInviteCodeClick = async () => {
        await navigator.clipboard.writeText(inviteCode);
        if (document.getElementById("copy").classList.contains("copy-invite-code")) {
            document.getElementById("copy").classList.remove("copy-invite-code");
        }
        setTimeout(() =>
                document.getElementById("copy").classList.add("copy-invite-code"),
            10);
    };

    return (
        <Card className="mt-3 p-1 text-center invite-code" border={"dark"}>
            <div className="">Код приглашения:</div>
            <div className="d-flex justify-content-center align-items-center">
                <div style={{marginRight: "1rem"}}>{inviteCode}</div>
                <Button
                    variant={"light"}
                    className="m-0 p-0 btn-outline-light"
                    onClick={copyInviteCodeClick}
                >
                    <Image src={copy} width="20px" height="20px"/>
                </Button>
            </div>
        </Card>
    );
};

export default LobbyInviteCode;