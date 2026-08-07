import mongoose from "mongoose";
import list from "./listModel.js"
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
      quantity: Number,
    },
  ],
  totalPrice: Number,
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
