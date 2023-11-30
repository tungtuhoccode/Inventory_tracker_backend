const { Sequelize, Model, DataTypes } = require("sequelize");
const {sequelize} = require("../config/dbConfigs")

const StorageLocation = sequelize.define("storage_location", {
    storage_location_name: DataTypes.TEXT,
})

module.exports = {StorageLocation}