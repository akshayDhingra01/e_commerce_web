const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//function to create user by getting details from the client
const userRegisteration = (body => {
  const newUser = new User({
    username: body.username,
    email: body.email,
    isSeller: body.isSeller,
    password: CryptoJS.AES.encrypt(
      body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  return newUser
});


// function for login detials of a user 
const userLogin = (async (req,res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller
        },
        process.env.JWT_SEC,
          // {expiresIn: false}
            {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = {userRegisteration , userLogin};
