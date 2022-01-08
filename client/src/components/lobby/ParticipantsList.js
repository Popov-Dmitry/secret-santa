import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import {deleteById} from "../../http/participantApi";

const ParticipantsList = ({participants, setParticipants, lobby}) => {
    const {user} = useContext(Context);

    const kickClick = async (event) => {
        setParticipants(participants.filter(p => p.id != event.target.id));
        await deleteById(event.target.id);
    }

    return (
        <div>
            {participants.map(p =>
                <div key={p.id} className="fs-5 mt-2">
                    {p.user.full_name}
                    {user.user.id === lobby.owner.userId &&
                        <span className="m-3">
                            <Button
                                id={p.id}
                                variant={"danger"}
                                size={"sm"}
                                style={{fontSize: "12px", padding: "0.17rem 0.34rem"}}
                                onClick={kickClick}
                            >Х
                            </Button>
                        </span>
                    }
                </div>
            )}
        </div>
    );
};

export default ParticipantsList;