const { Sequelize, Model, DataTypes } = require("sequelize");
const {sequelize} = require("../config/dbConfigs")

const Brand = sequelize.define("brand", {
    brand_name: DataTypes.TEXT,
})

module.exports = {Brand}