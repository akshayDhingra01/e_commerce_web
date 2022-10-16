// POST /api/seller/create-catalog
// Send a list of items to create a catalog for a seller
// GET /api/seller/orders
// Retrieve the list of orders received by a seller


const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller
} = require("./verifyToken");

const router = require("express").Router();



//GET ALL orders for a seller
router.get("/list-of-sellers", verifyTokenAndAuthorization,async (req, res) => {

    console.log("list of seller");
  try {
    listOfSellers = await User.find({ "isSeller": true }, {"username" : 1 , "email" : 1 , "isSeller" : 1});
    res.status(200).json(listOfSellers);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


//GET CATALOG OF PARTICULAR SELLER
router.get("/seller-catalog/:seller_id", verifyTokenAndAuthorization, async (req, res) => {
//   console.log("req.params.seller_id" , req.params.seller_id);
  const seller_idOfSeller = req.params.seller_id
  console.log("seller_idOfSeller" , seller_idOfSeller);
  try {
      if (seller_idOfSeller) {
        catalogOfSeller = await Catalog.find({"sellerId" : seller_idOfSeller});   // Why insertOne is not wroking here
        console.log(("catalogOfSeller" , catalogOfSeller));
      } else {
        res.status(500).json("no catalog of seller found")
      }
  // 
      res.status(200).json(catalogOfSeller);
    } catch (err) {
      res.status(500).json(err);
    }
  });






//Send a list of items to create an order for seller with id = seller_id
router.post("/create-order/:seller_id", verifyTokenAndAuthorization, async (req, res) => {
    //   console.log("req.params.seller_id" , req.params.seller_id);

      const seller_idOfSeller = req.params.seller_id
      console.log("seller_idOfSeller" , seller_idOfSeller);
      console.log(req.body); 
      const orderToBuy = req.body
      try {
          if (seller_idOfSeller) {
            cart = await Cart.insertMany(orderToBuy);   // Why insertOne is not wroking here
            console.log(("orderToBuy" , orderToBuy));
          } else {
            res.status(500).json("no catalog of seller found")
          }
      // 
          res.status(200).json(orderToBuy);
        } catch (err) {
          res.status(500).json(err);
        }
      });



module.exports = router;
