import orders from "../models/orderModel.js";
const createOrder = async (req, res) => {
  const { user, items, totalPrice, paymentMethod, deliveryAddress } = req.body;
  try {
    if (!user || !items || !totalPrice || !paymentMethod || !deliveryAddress) {
      return res.status(400).json({ message: "all field required" });
    }
    const newOrder = new orders({
      user,
      items,
      totalPrice,
      paymentMethod,
      deliveryAddress,
    });
    await newOrder.save();
    return res.status(200).json({ message: "oreder successfull" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const getAllOrders = async (req, res) => {
  console.log("get all data");
  try {
    const allOrders = await orders
      .find({})

      .populate("user");

    return res.status(200).json({ allOrders });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log("userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const orderData = await orders.find({
      user: userId,
    });

    console.log("orders:", orderData);

    return res.status(200).json({
      success: true,
      orders: orderData,
    });
  } catch (err) {
    console.log("GET ORDERS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};

const updateOrder = async (req, res) => {
  const { userId } = req.params;
  const { user, items, totalAmount, deleveryAddress } = req.body;
  try {
    const updatedOrder = await orders.findByIdAndUpdate(userId);
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    updatedOrder.user = user;
    updatedOrder.items = items;
    updatedOrder.totalAmount = totalAmount;
    updatedOrder.deleveryAddress = deleveryAddress;
    await updateOrder.save();
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    });
  }
};
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await orders.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
export default {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};
