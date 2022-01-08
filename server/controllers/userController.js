const userService = require("../services/userService");

class UserController {
    async create(req, res) {
        try {
            let {email, password, fullName} = req.body;
            let userWithToken = await userService.create(email, password, fullName);
            return res.status(201).json({userWithToken});
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

    async login(req, res) {
        try {
            let {email, password} = req.body;
            let userWithToken = await userService.login(email, password);
            return res.status(200).json(userWithToken);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }

    async validateToken(req, res) {
        try {
            let {id, email} = req.body;
            let token = await userService.refresh(id, email);
            return res.status(200).json({token});
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }

    async update(req, res) {
        try {
            let {email, fullName, password} = req.body;
            let user = await userService.update(req.params.id, email, fullName, password);
            return res.status(200).json(user);
        }
        catch (e) {
            return res.status(400).json(e.toString());
        }
    }
}

module.exports = new UserController();