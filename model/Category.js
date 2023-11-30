const { Sequelize, Model, DataTypes } = require("sequelize");
const {sequelize} = require("../config/dbConfigs")



const Category = sequelize.define("category", {
    category_name: DataTypes.TEXT,
})

module.exports = {Category}