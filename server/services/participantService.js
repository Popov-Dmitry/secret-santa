const {Participant, User, Lobby} = require("../models/models");

class ParticipantService {
    async create(wishes, address, userId, lobbyId) {
        return await Participant.create({wishes, address, userId, lobbyId});
    }

    async findById(id) {
        if (!id || id < 0) {
            throw new Error("Incorrect id");
        }
        return await Participant.findByPk(id,
            {include: [{model: User, as: "user"},
                    {model: Lobby, as: "lobby"}]})
    }
}

module.exports = new ParticipantService();