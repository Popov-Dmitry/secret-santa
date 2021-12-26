const userService = require("../services/userService");

class UserController {
    async create(req, res) {
        try {
            let {email, password, fullName} = req.body;
            let user = await userService.create(email, password, fullName);
            return res.status(201).json(user);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }

    async getById(req, res) {
        try {
            let user = await userService.findById(req.params.id);
            return res.status(200).json(user);
        }
        catch (e) {
            return res.status(404).json(e.toString());
        }
    }
}

module.exports = new UserController();