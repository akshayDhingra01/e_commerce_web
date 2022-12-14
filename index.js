const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const buyerRoute = require("./routes/buyer")
const userRoute = require("./routes/user");
const authRoute = require("./src/auth/auth.contoller");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const sellerRoute = require("./routes/seller")

const cors = require("cors");


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/sellers", sellerRoute);
app.use("/api/buyers", buyerRoute);



app.listen(process.env.PORT || 9000, () => {
  console.log("Backend server is running!");
});
