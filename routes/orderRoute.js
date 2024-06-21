const express = require("express");

const authMiddleware = require("../middlewares/auth");

const orderController = require("../controllers/orderController");
const placeController = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, orderController.placeOrder);
orderRouter.post("/verify", placeController.verifyOrder);
orderRouter.post("/userorders", authMiddleware, orderController.userOrders);
orderRouter.get("/list", orderController.listOrders);
orderRouter.post("/status", orderController.updateStatus);
module.exports = orderRouter;
