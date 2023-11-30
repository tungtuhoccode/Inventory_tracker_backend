const { Sequelize, Model, DataTypes } = require("sequelize");
const {sequelize} = require("../config/dbConfigs");
const { Product } = require("./Product");



const Image = sequelize.define("images", {
    image_url: DataTypes.TEXT,
})

Product.hasMany(Image, {
    foreignKey:"product_id"
})
Image.belongsTo(Product, {
    foreignKey:"product_id"
})

module.exports = {Image}