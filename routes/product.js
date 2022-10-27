const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller
} = require("../src/verifyToken");

const router = require("express").Router();
const productService = require("../controllers/product.controller")


//POST PRODUCT in the database
router.post("/", verifyTokenAndSeller, async (req, res) => {
    return productService.createProduct(verifyTokenAndSeller,(req, res))
});


//UPDATE the Product in the database
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    return productService.updateProduct(verifyTokenAndAdmin,(req, res))
});


//DELETE the Product in the database
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    return productService.deleteProduct(verifyTokenAndAdmin, (req, res))
});


//GET a particular PRODUCT from the database
router.get("/find/:id", async (req, res) => {
    return productService.findProductByProductId((req, res))
});


//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    return productService.findAllProducts((req, res))
});

module.exports = router;
