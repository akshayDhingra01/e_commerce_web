const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema(
  {
    sellerId : { type: String, required: true , unique : true},
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          // default: 1,  (check how to make it default)
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalog", CatalogSchema);
