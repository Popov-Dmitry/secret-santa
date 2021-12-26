const lobbyService = require("../services/lobbyService");

class LobbyController {
    async create(req, res) {
        try {
            let {title, description, isPrivate, ownerId, giftPrice, currency} = req.body;
            let lobby = await lobbyService.create(title, description, isPrivate, ownerId, giftPrice, currency);
            return res.status(201).json(lobby);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }

    async getAllPublic(req, res) {
        try {
            let lobbies = await lobbyService.findAllPublic();
            return res.status(200).json(lobbies);
        }
        catch (e) {
            return res.status(500).json(e.toString());
        }
    }

    async getById(req, res) {
        try {
            let lobby = await lobbyService.findById(req.params.id);
            return res.status(200).json(lobby);
        }
        catch (e) {
            return res.status(404).json(e.toString());
        }
    }

    async getByInviteCode(req, res) {
        try {
            let lobby = await lobbyService.findByInviteCode(req.params.id);
            return res.status(201).json(lobby);
        }
        catch (e) {
            return res.status(404).json(e.toString());
        }
    }
}

module.exports = new LobbyController();