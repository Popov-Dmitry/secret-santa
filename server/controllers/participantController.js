const participantService = require("../services/participantService")

class ParticipantController {
    async create(req, res) {
        let {wishes, address, userId, lobbyId} = req.body;
        try {
            let participant = await participantService.create(wishes, address, userId, lobbyId);
            return res.status(201).json(participant);
        }
        catch (e) {
            return res.status(400).json(e.toString())
        }
    }

    async getById(req, res) {
        try {
            let participant = await participantService.findById(req.params.id)
            return res.status(201).json(participant);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }

    async getByLobbyId(req, res) {
        try {
            let participants = await participantService.findByLobbyId(req.params.id);
            return res.status(200).json(participants);
        }
        catch (e) {
            return res.status(404).json(e.toString());
        }
    }

    async count(req, res) {
        try {
            console.log("aboba")
            let participantsCount = await participantService.count();
            return res.status(200).json({count: participantsCount});
        }
        catch (e) {
            return res.status(500).json(e.toString())
        }
    }
}

module.exports = new ParticipantController();