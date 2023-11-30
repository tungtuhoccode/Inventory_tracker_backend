const { Sequelize, Model, DataTypes } = require("sequelize");
const {sequelize} = require("../config/dbConfigs")

const {Product} = require("./model/Product")

const syncDatabase = async () => {
    try{
        await sequelize.sync( {force:true})
        console.log("Successfully sync database")
    }   
    catch(err){
        console.log("Sync database failed")
        console.log("Error:", err.message)
    }
}

Product.

module.exports = {testDBConnection, sequelize, syncDatabase};
