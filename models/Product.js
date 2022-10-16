const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    img: { type: String},
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    sellerId : { type: String }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
