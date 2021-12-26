const {User} = require("../models/models");

class UserService {
    async create(email, password, full_name) {
        return await User.create({email, password, full_name});
    }

    async findById(id) {
        if (!id || id < 0) {
            throw new Error("Incorrect id");
        }
        return await User.findByPk(id);
    }
}

module.exports = new UserService();