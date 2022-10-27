const Catalog = require("../models/Catalog");
const User = require("../models/User");
const Cart = require("../models/Cart");
const {
  verifyTokenAndAuthorization,
} = require("../routessss/verifyToken");



//GET ALL orders for a seller
const listOfSellers =  (verifyTokenAndAuthorization, async (req, res) =>{
  
    console.log("list of seller");
  try {
    listOfSellers = await User.find({ "isSeller": true }, {"username" : 1 , "email" : 1 , "isSeller" : 1});
    res.status(200).json(listOfSellers);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

//GET CATALOG OF PARTICULAR SELLER
const catalogOfParticularSeller =  (verifyTokenAndAuthorization, async (req, res) => {

  const seller_idOfSeller = req.params.seller_id
    console.log("seller_idOfSeller" , seller_idOfSeller);
    try {
        if (seller_idOfSeller) {
          catalogOfSeller = await Catalog.find({"sellerId" : seller_idOfSeller});   
          console.log(("catalogOfSeller" , catalogOfSeller));
        } else {
          res.status(500).json("no catalog of seller found")
        }
        res.status(200).json(catalogOfSeller);
      } catch (err) {
        res.status(500).json(err);
      }
    });


//Send a list of items to create an order for seller with id = seller_id
const orderForParticularSeller = (verifyTokenAndAuthorization, async (req, res) => {

  const seller_idOfSeller = req.params.seller_id
  console.log("seller_idOfSeller" , seller_idOfSeller);
  console.log(req.body); 
  const orderToBuy = req.body
  const products = orderToBuy["products"]
  console.log("products" , orderToBuy["products"]);

  try {
      if (seller_idOfSeller) {
        catalogOfSeller = await Catalog.find({"sellerId" : seller_idOfSeller});
        productscatalogOfSeller = catalogOfSeller[0]["products"]
        console.log("catalogOfSeller" , catalogOfSeller);
        console.log("productscatalogOfSeller" , productscatalogOfSeller);

        if (productscatalogOfSeller.length < products.length) {
            console.log("not");
            res.status(500).json("products ordered are more than the product in the catalog");
        }

        console.log(products.length);

        for (let iterable = 0; iterable < products.length; iterable++) {
            console.log("productsssss" , products[iterable]);
            const prodId = products[iterable]["productId"];
            const prodQty = products[iterable]["quantity"];
            var productFoundInCatalog = 0;
            console.log("productsssss" , productscatalogOfSeller);

            for (let countInproductscatalogOfSeller= 0; countInproductscatalogOfSeller < productscatalogOfSeller.length; countInproductscatalogOfSeller++) {

                console.log("productssssssssss" , products[iterable]);
                if (prodId == productscatalogOfSeller[countInproductscatalogOfSeller]["productId"]){
                    if (prodQty > productscatalogOfSeller[countInproductscatalogOfSeller]["quantity"]){
                        res.status(500).json("quantity of a product ordered is more than available in catalog");
                        // break
                    }
                    // break
                }
            }
        }

        for (let iterable = 0; iterable < products.length; iterable++) {
            console.log("productssss" , products[iterable]);
            const prodId = products[iterable]["productId"];
            console.log("prodId" , String(prodId));
            const prodQty = products[iterable]["quantity"];
            var productFoundInCatalog = 0
            for (let countInproductscatalogOfSeller= 0; countInproductscatalogOfSeller < productscatalogOfSeller.length; countInproductscatalogOfSeller++) {
                if (prodId == productscatalogOfSeller[countInproductscatalogOfSeller]["productId"]){
                    var newQuantity = productscatalogOfSeller[countInproductscatalogOfSeller]["quantity"] - prodQty

                    const udpatedCatalog = await Catalog.updateOne({"sellerId" : seller_idOfSeller,  "products.productId" : prodId }, { "$set": { "products.$.quantity": newQuantity }});
                }
            }
        }

        order = await Cart.insertMany(orderToBuy);   
        console.log(("orderToBuy" , orderToBuy));
      } else {
        res.status(500).json("no catalog of seller found")
      }
      res.status(200).json(orderToBuy);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = {listOfSellers , catalogOfParticularSeller , orderForParticularSeller}

