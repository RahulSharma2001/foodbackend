const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const foodRouter = require("./routes/foodRoute");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRoute");
const connectDb = require("./config/db");
const dotenv = require("dotenv/config.js");

const app = express();

//app config
app.listen;
const port = process.env.PORT || 5000;

//middleware

app.use(express.json());
app.use(cors());

app.use("/api/user/", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

connectDb();

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
