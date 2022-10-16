const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  console.log("authHeader" , authHeader)
  if (authHeader) {
    user = req.user
    
    var token = authHeader.split(" ")[1];
    token = authHeader;
    // console.log("token" , token)
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      console.log(user)
      // console.log(err)
      if (err) res.status(403).json("Token is not valid!");
      console.log(req.user)
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req)
    if (req.user.id === req.params.id || req.user.isAdmin || req.user.isSeller || !req.user.isSeller) {
      console.log("verifyTokenAndAuthorization")
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  // console.log(req,res)
  verifyToken(req, res, () => {
    // console.log(req,res)
    if (req.user.isAdmin) {
      
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndSeller = (req, res, next) => {
    // console.log(req,res)
    verifyToken(req, res, () => {
      // console.log(req,res)

      if (req.user.isSeller) {
        console.log("true seller");
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };



module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
};
