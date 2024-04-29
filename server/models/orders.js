const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    customerEmail: {
      // Add the customerEmail field
      type: String,
      required: true,
    },
    customerAddress: {
      // Add the customerAddress field
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;
