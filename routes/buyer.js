const {
  verifyTokenAndAuthorization,
} = require("../src/verifyToken");

const router = require("express").Router();
const buyerService = require("../controllers/buyer.service")



//GET ALL orders for a seller
router.get("/list-of-sellers", verifyTokenAndAuthorization,async (req, res) => {
    return buyerService.listOfSellers(verifyTokenAndAuthorization, (req, res))
  });
  

//GET CATALOG OF PARTICULAR SELLER
router.get("/seller-catalog/:seller_id", verifyTokenAndAuthorization, async (req, res) => {
  return buyerService.catalogOfParticularSeller(verifyTokenAndAuthorization, (req, res))
  });


//Send a list of items to create an order for seller with id = seller_id
router.post("/create-order/:seller_id", verifyTokenAndAuthorization, async (req, res) => {

  return buyerService.orderForParticularSeller(verifyTokenAndAuthorization, (req, res))
      });


module.exports = router;
