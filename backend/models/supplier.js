const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  supplierName: {
    type: String,
    required: true,
  },
  supplierphoneNumber: {
    type: Number,
    required: true,
  },

  supplierCompany: {
    type: String,
    required: true,
  },
  supplierPay: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("supplier",supplierSchema);


