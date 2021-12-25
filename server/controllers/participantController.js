const participantService = require("../services/participantService")

class ParticipantController {
    async create(req, res) {
        let {wishes, address, userId, lobbyId} = req.body;
        try {
            let participant = await participantService.create(wishes, address, userId, lobbyId);
            return res.status(201).json(participant);
        }
        catch (e) {
            return res.status(400).json(e)
        }
    }

    async getById(req, res) {
        try {
            let participant = await participantService.findById(req.params.id)
            return res.status(201).json(participant);
        }
        catch (e) {
            return res.status(400).json(e);
        }
    }
}

module.exports = new ParticipantController();