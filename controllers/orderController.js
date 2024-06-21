const orderModel = require("../models/orderModel.js");
const userModel = require("../models/userModel.js");
const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51PTmHSFSiPBiknHD57d0R1P8RVkg7uDPr6UZFfAHY2cLZ3LikCCTbg9IxWYYclIFcqC4ya4x2zj58RPkCrZ012lN00FC8hV21s"
);

const placeOrder = async (req, res) => {
  const front_url = "http://localhost:5174";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 4 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${front_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${front_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      console.log("iside fail");
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error" });
  }
};

//orders for admin

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error" });
  }
};
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const placeController = {
  verifyOrder,
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
};
module.exports = placeController;
