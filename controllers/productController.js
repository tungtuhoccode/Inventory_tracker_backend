const {StorageLocation} = require("../model/StorageLocation") 
const {Category} = require("../model/Category") 
const {Brand} = require("../model/Brand")
const {Product} = require("../model/Product")
const {Image} = require("../model/Image")

const {sequelize} = require('../config/dbConfigs')

//SQL QUERY IMPORT
const fs = require("fs");

const getAllCategoriesQuery = fs.readFileSync("./query/getAllCategories.sql").toString();
const getAllBrandsQuery = fs.readFileSync("./query/getAllBrands.sql").toString();
const getAllStorageLocationsQuery = fs.readFileSync("./query/getAllStorageLocations.sql").toString();
const {getSingleProductQuery} = require("../query/getSingleProduct")

//@Category controller
const getAllCategories = async (req, res) => {     
    try{
        const [results, metadata] = await sequelize.query(getAllCategoriesQuery)
        console.log(results)
        res.json(results)
    }
    catch(err){
        console.log(err.message)
        res.json("error")
    }
}

const addNewCategory = async (req, res) => {  
   
    if(!req.body.category_name){
        return res.json("no category name")
    }  
    try{
        const start = Date.now();


      
        const newCategory = await Category.create({
            category_name: req.body.category_name
        }) 
        const end = Date.now();
        console.log(`Category upload time: ${end - start} ms`);

        return res.json(newCategory)
    }
    catch(err){
        console.log(err.message)
        return res.json("error creating category")
    }
}

//@Brands controller
const getAllBrands = async (req, res) => {     
    try{
        const [results, metadata] = await sequelize.query(getAllBrandsQuery)
        console.log(results)
        res.json(results)
    }
    catch(err){
        console.log(err.message)
        res.json("error")
    }
}

const addNewBrand = async (req, res) => {  
    if(!req.body.brand_name){
        return res.json("no brand_name")
    }  
    try{
        const newBrand = await Brand.create({
            brand_name: req.body.brand_name
        }) 

        return res.json(newBrand)
    }
    catch(err){
        console.log(err.message)
        return res.json("error creating brand")
    }
}

//@Get all storage locations
const getAllStorageLoctions = async (req, res) => {     
    try{
        const [results, metadata] = await sequelize.query(getAllStorageLocationsQuery)
        console.log(results)
        res.json(results)
    }
    catch(err){
        console.log(err.message)
        res.json("error")
    }
}

const addNewStorageLocation = async (req, res) => {  
    if(!req.body.storage_location_name){
        return res.json("no storage_location_name")
    }  
    try{
        const newStorageLocation = await StorageLocation.create({
            storage_location_name: req.body.storage_location_name
        })
        // const [results, metadata] = await sequelize.query(getAllStorageLocationsQuery)

        return res.json(newStorageLocation)
    }
    catch(err){
        console.log(err.message)
        return res.json("error creating brand")
    }
}

//@Product controller
const addNewProduct = async (req, res) => { 
    if(!req.body){
        return res.status(400).json({"error":"missing body"})
    }
    //require: name, category and stock  
    if(!req.body.product_name){
        console.log("no product name")
    }
    if (!req.body.category_id){
        console.log("no category id")
    }
    if (!req.body.stock){
        console.log("no stock")
    }
    if(!req.body.barcode){
        console.log("no barcode")
    }
    if(!req.body.brand_id){
        console.log("no brand id")
    }
    if(!req.body.price){
        console.log("no price")
    }
    if(!req.body.import_price){
        console.log("no import price")
    }
    if(req.body.image_urls == []){
        console.log("no images")
    }
    if(!req.body.storage_location_id){
        console.log("no location id")
    }


    switch(true){
        case(!req.body.product_name):
            return res.status(400).json({"error": "missing product name"})
        case(!req.body.category_id):
            return res.status(400).json({"error": "missing category_id"})
        case(!req.body.stock):
            return res.status(400).json({"error": "missing stock"})
        default: 
            break;
    }
    
        console.log(req.body)
        try{
            const product = await Product.create({
                barcode: req.body.barcode,
                product_name: req.body.product_name,
                category_id: req.body.category_id,
                brand_id: req.body.brand_id,
                price: req.body.price,
                import_price: req.body.import_price,
                stock: req.body.stock, 
                storage_location_id: req.body.storage_location_id, 
        })

        if(req.body.image_urls){
            let ImageObjects = []
            let image_urls = req.body.image_urls
    
            for (let i=0;i<image_urls.length;i++){
                ImageObjects.push({
                    image_url: image_urls[i],
                    product_id: product.id
                })
            }
                
            await Image.bulkCreate(ImageObjects)
        }
       
        return res.status(200).json("Successfully added new product ")
    }
    catch(err){
        console.log("Error",err.message)
        return res.status(500).json({
            error_message: err.message
        })
    }
}

const getSingleProduct = async (req,res) => {
    if(!req.query.id){
        res.status(400).json("No id params found in query")
    }
    const productId = req.query.id

    try{
        console.log("Request information for product id:", productId)
        const [result] = await sequelize.query(getSingleProductQuery(productId))
        res.json(result)
    }
    catch(err){
        console.log("error: ", err.message)
    }

}
module.exports = {
    addNewProduct,
    getAllCategories,
    addNewCategory,
    getAllStorageLoctions,
    addNewStorageLocation,
    getAllBrands,
    addNewBrand,
    getSingleProduct
};