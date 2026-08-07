import dotenv from "dotenv";
dotenv.config();
import Cart from "../models/cartModel.js";
import jwt from "jsonwebtoken";
const addToCart = async (req, res) => {
  const { userId, foodId, quantity, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    // if cart does not exist
    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            foodId,
            quantity,
          },
        ],
        totalPrice: price * quantity,
      });
    } else {
      // check item already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.foodId.toString() === foodId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          foodId,
          quantity,
        });
      }

      // update total price
      cart.totalPrice += price * quantity;
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart",
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.SECRET_KEY);
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Get user id from token
    const userId = decoded.id;

    // Fetch cart items of logged-in user
    const cartItems = await Cart.find({ userId }).populate("items.foodId");

    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default { addToCart, getCartItems };
