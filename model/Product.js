const { Sequelize, Model, DataTypes } = require("sequelize");
const {sequelize} = require("../config/dbConfigs")

const {Category} = require("./Category")
const {StorageLocation} = require("./StorageLocation")
const {Brand} = require("./Brand")

const Product = sequelize.define("products", {
    barcode: DataTypes.TEXT,
    product_name: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    import_price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
})

Category.hasMany(Product, {
    foreignKey:"category_id"
})
Product.belongsTo(Category, {
    foreignKey:"category_id"
})

StorageLocation.hasMany(Product, {
    foreignKey:"storage_location_id"
})
Product.belongsTo(StorageLocation, {
    foreignKey:"storage_location_id"
})

Brand.hasMany(Product, {
    foreignKey:"brand_id"
})
Product.belongsTo(Brand, {
    foreignKey:"brand_id"
})



module.exports = {Product}