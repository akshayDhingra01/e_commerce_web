const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../src/verifyToken");

const router = require("express").Router();
const userService = require("../controllers/user.controller")


//PUT user details
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    return userService.udpateUserInformation = (verifyTokenAndAuthorization,(req, res))
});


//DELETE user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    return userService.deleteUser = (verifyTokenAndAuthorization,(req, res))
});


//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    return userService.findUserById = (verifyTokenAndAdmin,(req, res))
});


//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    return userService.findAllUsers = (verifyTokenAndAdmin, (req, res))
});


module.exports = router;
