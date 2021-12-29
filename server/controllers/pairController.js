const pairService = require("../services/pairService");

class PairController {
    async pairUp(req, res) {
        try {
            let {lobbyId} = req.body;
            let pairs = await pairService.pairUp(lobbyId);
            return res.status(201).json(pairs);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }

    async getByFromId(req, res) {
        try {
            let pair = await pairService.getByFromId(req.params.id);
            return res.status(200).json(pair);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }

    async getAllByLobbyId(req, res) {
        try {
            let pair = await pairService.getAllByLobbyId(req.params.id);
            return res.status(200).json(pair);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }
}

module.exports = new PairController();