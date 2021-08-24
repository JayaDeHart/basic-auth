"use strict";
const POSTGRES_URI =
    process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }
        : {};
const { Sequelize, DataTypes } = require("sequelize");
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const usersSchema = require("./users")
const usersModel = usersSchema(sequelize, DataTypes)

module.exports = {
    db: sequelize,
    Users: usersModel
}