const {User, Lobby, Owner, Price} = require("../models/models");

class LobbyService {
    async create(title, description, isPrivate, ownerId, giftPrice, currency) {
        if (!ownerId || !await User.findByPk(ownerId)) {
            throw new Error(`User with id ${ownerId} is not found`);
        }

        let inviteCode = generateInviteCode(6);
        const lobby = await Lobby.create({
            title: title,
            description: description,
            is_private: isPrivate,
            invite_code: inviteCode});

        await Owner.create({
            lobbyId: lobby.id,
            userId: ownerId});

        if (giftPrice && currency) {
            await Price.create({
                gift_price: giftPrice,
                currency: currency,
                lobbyId: lobby.id});
        }
        return await this.findById(lobby.id);
    }

    async findAllPublic() {
        return await Lobby.findAll({
            where: {
                is_private: false
            },
            include:
                [{model: Owner, as: "owner"},
                    {model: Price, as: "price"}]
        });
    }

    async findById(id) {
        if (!id || id < 0) {
            throw new Error("Incorrect id");
        }
        return await Lobby.findByPk(id,
            {
                include:
                    [{model: Owner, as: "owner"},
                        {model: Price, as: "price"}]
            });
    }

    async findByInviteCode(inviteCode) {
        if (!inviteCode || inviteCode.trim().length === 0) {
            throw new Error("Incorrect invite code")
        }
        let lobby = await Lobby.findOne({
            where: {
                invite_code: inviteCode
            },
            include:
                [{model: Owner, as: "owner"},
                    {model: Price, as: "price"}]
        });
        if (lobby) {
            return lobby;
        }
        throw new Error("Incorrect invite code");
    }
}

function generateInviteCode(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < length; i++)
        code += chars.charAt(Math.floor(Math.random() * chars.length));

    return code;
}

module.exports = new LobbyService();