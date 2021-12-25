const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        full_name: {type: DataTypes.STRING, allowNull: false}
    });

const Participant = sequelize.define("participant",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        wishes: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING}
    });

const Lobby = sequelize.define("lobby",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, unique: true, allowNull: false},
        description: {type: DataTypes.STRING},
        is_private: {type: DataTypes.BOOLEAN, allowNull: false},
        invite_code: {type: DataTypes.STRING}
    });

const Owner = sequelize.define("owner",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
    });

const Price = sequelize.define("price",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        gift_price: {type: DataTypes.INTEGER},
        currency: {type: DataTypes.STRING}
    });

User.hasMany(Participant);
Participant.belongsTo(User);

Lobby.hasMany(Participant);
Participant.belongsTo(Lobby);

Lobby.hasOne(Owner);
Owner.belongsTo(Lobby);

User.hasMany(Owner);
Owner.belongsTo(User);

Lobby.hasOne(Price);
Price.belongsTo(Lobby);

module.exports = {
    User,
    Participant,
    Lobby,
    Price
}