const {Participant, Pair} = require("../models/models");

class PairService {
    async pairUp(lobbyId) {
        if (!lobbyId || lobbyId < 0) {
            throw new Error("Incorrect lobbyId");
        }
        const pairs = await this.getAllByLobbyId(lobbyId);
        if (pairs.length !== 0) {
            throw new Error("Participants already paired in this lobby");
        }
        let participants = await Participant.findAll({
            where: {
                lobbyId: lobbyId
            }
        });
        if (participants.length % 2 !== 0 || participants.length === 0) {
            throw new Error("Cannot be paired because there are not enough participants.")
        }
        shuffle(participants);
        let participants2 = JSON.parse(JSON.stringify(participants));
        shuffle(participants2);
        while (participants.length !== 0) {
            let participant = participants.shift();
            let participant2 = participants2.shift();
            console.log(participant.id + "," + participant2.id);
            while (participant.id === participant2.id) {
                participants.push(participant);
                participant = participants.shift();
            }
            await Pair.create({fromId: participant.id, toId: participant2.id});
        }
        return this.getAllByLobbyId(lobbyId);
    }

    async getByFromId(fromId) {
        if (!fromId || fromId < 0) {
            throw new Error("Incorrect fromId");
        }
        return await Pair.findOne({
            where: {
                fromId: fromId
            },
            include:
                [{model: Participant, as: "from"},
                    {model: Participant, as: "to"}]
        });
    }

    async getAllByLobbyId(lobbyId) {
        if (!lobbyId || lobbyId < 0) {
            throw new Error("Incorrect lobbyId");
        }
        return await Pair.findAll({
            include:
                [{model: Participant, as: "from", where: {lobbyId}},
                    {model: Participant, as: "to", where: {lobbyId}}]
        });
    }
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

module.exports = new PairService();