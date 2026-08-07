import mongoose from "mongoose";
const deliverySchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },

  deliveryBoyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: String,
  deliveredAt: Date,
});
const Delivered = mongoose.model("Delevered", deliverySchema);
