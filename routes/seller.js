const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const {
  verifyTokenAndSeller
} = require("../src/verifyToken");

const router = require("express").Router();
const sellerService = require("../controllers/seller.controller")


//GET ALL orders for a seller
router.get("/orders", verifyTokenAndSeller, async (req, res) => {
    return sellerService.findAllOrdersForSeller(verifyTokenAndSeller,(req, res))
  });
  

//POST CATALOG
router.post("/create-catalog", verifyTokenAndSeller, async (req, res) => {
    return sellerService.createCatalog = (verifyTokenAndSeller, (req, res))
  });


module.exports = router;
