const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema(
  {
    sellerId : { type: String, required: true , unique : true},
    products: [
      {
        name : {
          type: String,
          required:true
        },
        productId: {
          type: String,
          required:true
        },
        quantity: {
          type: Number,
          required:true
        },
        price:{
          type: Number,
          required:true
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalog", CatalogSchema);
