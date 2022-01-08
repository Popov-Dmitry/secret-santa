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
                where: {
                    email: email
                }
            });
        if (candidate) {
            throw new Error(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, full_name});
        return getUserWithToken(user);
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
                where: {
                    email: email
                }
            });
        if (!user) {
            throw new Error(`User with email ${email} does not exists`);
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            throw new Error("Incorrect password");
        }
        return getUserWithToken(user);
    }

    async refresh(id, email) {
        if (!email || email.trim().length === 0 || !id || id < 0) {
            throw new Error("Incorrect email or userId");
        }
        const user = await User.findOne(
            {
                where: {
                    id: id,
                    email: email
                }
            });
        if (!user) {
            throw new Error(`User with id ${id} and email ${email} does not exists`);
        }
        return generateJwt(id, email);
    }

    async update(id, email, full_name, password) {
        if (!email || email.trim().length === 0 || !id || id < 0) {
            throw new Error("Incorrect email or userId");
        }
        if (!full_name || full_name.trim().length === 0) {
            throw new Error("Empty name");
        }
        if (password && password.trim().length !== 0) {
            const hashPassword = await bcrypt.hash(password, 5);
            await User.update({
                email: email,
                full_name: full_name,
                password: hashPassword
            }, {
                where: {
                    id: id
                }
            });
            return this.findById(id);
        }
        await User.update({
            email: email,
            full_name: full_name
        }, {
            where: {
                id: id
            }
        });
        return this.findById(id);

    }
}

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "24h"}
    );
}

function getUserWithToken(user) {
    let userWithToken = {};
    userWithToken.id = user.id;
    userWithToken.email = user.email;
    userWithToken.password = user.password;
    userWithToken.full_name = user.full_name;
    userWithToken.createdAt = user.createdAt;
    userWithToken.updatedAt = user.updatedAt;
    userWithToken.token = generateJwt(user.id, user.email);
    return userWithToken;
}

module.exports = new UserService();