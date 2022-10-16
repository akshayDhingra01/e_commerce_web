// POST /api/seller/create-catalog
// Send a list of items to create a catalog for a seller
// GET /api/seller/orders
// Retrieve the list of orders received by a seller


const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
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
  // console.log("query" , query);
  // console.log(req)
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
  // console.log("catalogToAdd" , catalogToAdd);

  try {
      if (catalogToAdd) {
        catalog = await Catalog.insertMany(catalogToAdd);   // Why insertOne is not wroking here
        console.log(("catalogToAdd" , catalogToAdd));
      } else {
        res.status(500).json("no catalog to add")
      }
  // 
      res.status(200).json(catalogToAdd);
    } catch (err) {
      res.status(500).json(err);
    }
  });



// //GET ALL orders for a seller
// router.get("/orders", verifyTokenAndSeller, async (req, res) => {
//   const query = req.query.new;
//   console.log(req.query)
//   console.log("cant find")

//   try {
//     console.log("cant find")
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




// //CREATE CATALOG
// router.post("create-catalog", verifyTokenAndSeller,  async (req, res) => {
//     console.log("create-catalog")
//     const newCatalog = new Catalog(req.body);

//     console.log(newCatalog)
//     console.log("newCatalog")

  
//     try {
//       const savedCatalog = await newCatalog.save();
//       res.status(200).json(savedCatalog);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });








// //UPDATE
// router.put("/:id", verifyTokenAndSeller, async (req, res) => {
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString();
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET USER
// router.get("/find/:id", verifyTokenAndSeller, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL USER
// router.get("/", verifyTokenAndSeller, async (req, res) => {
//   const query = req.query.new;
//   console.log(req.query)
//   console.log("cant find")

//   try {
//     console.log("cant find")
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;
