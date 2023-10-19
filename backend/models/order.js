const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: Number,
    required: true,
  },

  isDelivered: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },

  billAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("order", OrderSchema);
