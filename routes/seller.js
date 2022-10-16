const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller
} = require("./verifyToken");

const router = require("express").Router();



//GET ALL orders for a seller
router.get("/orders", verifyTokenAndSeller, async (req, res) => {
  const query = req.query.new;
  const qOrder = req.query.order;
  console.log(req.query)
  console.log("qorder" , req.query.order)
  console.log("cant find")

  try {
    let orders;

      if (qOrder) {
        orders = await Order.find({ 'sellerId': qOrder });
        console.log(("orders" , orders));
      } else {
        console.log("else");
        res.status(500).json("seller id not mentioned")
      }
  // 
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


//CREATE CATALOG
router.post("/create-catalog", verifyTokenAndSeller, async (req, res) => {
  
  const catalogToAdd = req.body
  try {
      if (catalogToAdd) {
        catalog = await Catalog.insertMany(catalogToAdd);
        console.log(catalogToAdd);
        }
      else {
        res.status(500).json("no catalog to add")
      }
  // 
      res.status(200).json(catalogToAdd);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;
