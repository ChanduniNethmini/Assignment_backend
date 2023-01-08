const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  articleImage: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Product", productSchema);
