const {User} = require("../models/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
    async create(email, password, full_name) {
        if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
            throw new Error("Incorrect email or password");
        }
        if (!full_name || full_name.trim().length === 0) {
            throw new Error("Empty name");
        }
        const candidate = await User.findOne(
            {
                where:
                    {
                        email: email
                    }
            });
        if (candidate) {
            throw new Error(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, full_name});
        return generateJwt(user.id, user.email);
    }

    async findById(id) {
        if (!id || id < 0) {
            throw new Error("Incorrect id");
        }
        return await User.findByPk(id);
    }

    async login(email, password) {
        if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
            throw new Error("Incorrect email or password");
        }
        const user = await User.findOne(
            {
                where:
                    {
                        email: email
                    }
            });
        if (!user) {
            throw new Error(`User with email ${email} already exists`);
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            throw new Error("Incorrect password");
        }
        return generateJwt(user.id, user.email);
    }
}

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "24h"}
    );
}

module.exports = new UserService();