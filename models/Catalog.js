const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    sellerId : { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalog", CatalogSchema);
