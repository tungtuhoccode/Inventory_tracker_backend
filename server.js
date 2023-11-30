require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const logger = require('morgan')
const {testDBConnection, syncDatabase, sequelize} = require('./config/dbConfigs')
const cookieParser = require("cookie-parser");
const corsOptions = require('./config/corsOption');
const fs = require("fs");

//import all table from model in order to sync with the database
// const {Category} = require("./model/Category")
const {StorageLocation} = require("./model/StorageLocation") 
const {Category} = require("./model/Category") 
const {Brand} = require("./model/Brand")
const {Product} = require("./model/Product")
const {Image} = require("./model/Image")

// const getProduct = fs.readFileSync("./data.sql").toString();
const getProduct = fs.readFileSync("./query/getProduct.sql").toString();
const getAllProductsQuery = fs.readFileSync("./query/getAllProducts.sql").toString();

//connect to database
testDBConnection();
// syncDatabase();
//import routes

//middleware
app.use(logger('dev'));

app.use(cors(corsOptions))

app.use(cookieParser())

// parse json (Without this, server will not be able to handle json data in the body, thus will cause error)
app.use(express.json());

const productRoute = require("./routes/productRoute");
//ROUTE
app.use("/product", productRoute)

//change
app.use("/wipe-products-and-images",async (req, res) => {    
    try{

        await sequelize.query(`DELETE FROM products;`)
        await sequelize.query(`DELETE FROM images;`)
        await sequelize.query(`DELETE FROM brands;`)
        await sequelize.query(`DELETE FROM categories;`)
        await sequelize.query(`DELETE FROM storage_locations;`)
        res.json("Deleted images and products tables")
    }
    catch(err){
        console.log(err.message)
        res.json("error")
    }
})

app.use("/testfind",async (req, res) => {    
    try{
        const [results] = await sequelize.query(getAllProductsQuery)
        res.json(results)
    }
    catch(err){
        console.log(err.message)
        res.json("error")
    }
})

app.use("/setupdemo", async (req, res) => {
        try{
            await Category.create({category_name: "Máy cơ"})
            await StorageLocation.create({storage_location_name: "Tầng 3"})
            await Brand.create({ brand_name: "Toyota" })
            console.log("successfully created product")
        }
        catch(err){
            console.log("Created product failed")
            console.log("Error:", err.message)
        }
        res.json("finished")

    
});

//error route
app.use("/",(request, res) =>{
    res.status(404).json("no url exist")
})
  
app.listen(PORT, () => { console.log("Server is running on port "+PORT)})