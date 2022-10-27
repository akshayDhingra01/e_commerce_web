const router = require("express").Router();
const authService = require("./auth.service")


//REGISTER
router.post("/register", async (req, res) => {
  return authService.userRegisteration((req, res))
});


//LOGIN
router.post('/login', async (req, res) => {
  return authService.userLogin((req, res))
});

module.exports = router;
