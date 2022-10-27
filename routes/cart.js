const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../src/verifyToken");

const router = require("express").Router();
const cartService = require("../controllers/cart.controller")


// CREATE/Post cart for a user
router.post("/", verifyToken, async (req, res) => {
    return cartService.createCart(verifyToken, (req, res))
});


// UPDATE/Put cart of a user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    return cartService.updateCart(verifyToken, (req, res))
});


// DELETE/Remove cart of a user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    return cartService.deleteCartOfUser(verifyToken, (req, res))
});


//GET USER's CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    return cartService.findCartOfUser(verifyToken, (req, res))
});



// GET ALL carts in the database
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    return cartService.allCarts(verifyToken, (req, res))
});

module.exports = router;
