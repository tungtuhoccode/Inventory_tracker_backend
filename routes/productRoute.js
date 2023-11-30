const express = require('express')
const router = express.Router();

const {
    addNewProduct,
    getAllCategories,
    addNewCategory,
    getAllStorageLoctions,
    getAllBrands,
    addNewBrand,
    addNewStorageLocation, 
    getSingleProduct
} = require("../controllers/productController")




router.route("/add")
    .post(addNewProduct)


router.route("/get-all-categories")
    .get(getAllCategories)

router.route("/add-category")
    .post(addNewCategory)
    
router.route("/get-all-storage-locations")
    .get(getAllStorageLoctions)

router.route("/add-storage-location")
    .post(addNewStorageLocation)

router.route("/get-all-brands")
    .get(getAllBrands)

router.route("/add-brand")
    .post(addNewBrand)

router.route("").get(getSingleProduct)
    
module.exports = router;