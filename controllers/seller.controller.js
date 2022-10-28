const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const {
  verifyTokenAndSeller
} = require("../src/verifyToken");


//GET ALL orders for a seller
const findAllOrdersForSeller = (verifyTokenAndSeller, async (req, res) => {
    const query = req.query.new;
    const qOrder = req.query.order;

    try {
        let orders;

        if (qOrder) {
            orders = await Order.find({ 'sellerId': qOrder });
            console.log(("orders" , orders));
        } else {
            res.status(500).json("seller id not mentioned")
        }
    // 
        res.status(200).json(orders);
        } catch (err) {
        res.status(500).json(err);
        }
  });
  


//CREATE CATALOG in the database for a user
const createCatalog = (verifyTokenAndSeller, async (req, res) => {
  const catalogToAdd = req.body
  try {
      if (catalogToAdd) {
        catalog = await Catalog.insertMany(catalogToAdd);
        console.log(catalogToAdd);
        }
      else {
        res.status(500).json("no catalog to add")
      }
      res.status(200).json(catalogToAdd);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = {findAllOrdersForSeller , createCatalog};
