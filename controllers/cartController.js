const userModel = require("../models/userModel.js");

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = (await userData.cartData) || {};
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Removed From Cart",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error  ",
    });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData: cartData,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const cartController = {
  addToCart,
  removeFromCart,
  getCart,
};

module.exports = cartController;
