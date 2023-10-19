const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    required: true,
  },

  supplierName: {
    type: String,
    required: true,
  },
  materialCost: {
    type: Number,
    required: true,
  },

  materialQuantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("material", materialSchema);
