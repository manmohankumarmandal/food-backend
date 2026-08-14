import { mongoose } from "mongoose";
const { Schema } = mongoose;
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      foodId: {
        type: Schema.Types.ObjectId,
        ref: "List",
        required: true,
      },

      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "preparing",
      "out for delivery",
      "delivered",
    ],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Cash on Delivery", "UPI", "Card", "Net Banking"],
    required: true,
  },

  deliveryAddress: String,

  orderDate: {
    type: Date,
    default: Date.now,
  },
});
const orders = new mongoose.model("Order", orderSchema);
export default orders;
