const {Participant, User, Lobby} = require("../models/models");

class ParticipantService {
    async create(wishes, address, userId, lobbyId) {
        if (!lobbyId || lobbyId < 0) {
            throw new Error("Incorrect lobbyId");
        }
        if (!userId || userId < 0) {
            throw new Error("Incorrect userId");
        }
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

    async findByLobbyId(id) {
        if (!id || id < 0) {
            throw new Error("Incorrect id");
        }
        return await Participant.findAll(
            {
                where: {
                    lobbyId: id
                },
                include: [{model: User, as: "user"}]
            })
    }
}

module.exports = new ParticipantService();