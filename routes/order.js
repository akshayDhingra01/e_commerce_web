const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../src/verifyToken");

const router = require("express").Router();
const orderService = require("../controllers/order.controller")



//POST a new order for a user
router.post("/", verifyToken, async (req, res) => {
    return orderService.newOrderForUser(verifyToken, (req, res))
});


//PUT an order in database
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    return orderService.updateOrderOfUser(verifyTokenAndAdmin, (req, res))
});


//DELETE an order in the database
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    return orderService.deleteAnOrderOfUser(verifyTokenAndAdmin, (req, res))
});


//GET AN USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    return orderService.findParticularUser(verifyTokenAndAuthorization, (req, res))
});


//GET ALL ORDERS IN THE DATABASE
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    return orderService.findAllOrders(verifyTokenAndAdmin, (req, res))
});


// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    return orderService.calculateMonthlyIncome(verifyTokenAndAdmin, (req, res))
});

module.exports = router;
