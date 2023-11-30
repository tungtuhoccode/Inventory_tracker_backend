// In db.js
const { Sequelize } = require('sequelize');

// The secret connection string you copied earlier

// const connectionString = "postgresql://postgres:Qo1mVUl8G5D2Ru4KgtQp@containers-us-west-147.railway.app:7964/railway"
// const connectionString = "postres://postgres@Localhost:5432/postgres"

const user = 'tung'
const host = 'localhost'
const database = 'tung'
const password = 'postgres'
const port = '5432'


const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })
// const sequelize = new Sequelize(connectionString,{  
//     logging: false
// })


const testDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

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

module.exports = {testDBConnection, sequelize, syncDatabase};