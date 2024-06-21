const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sharma123:rahul123@cluster0.ejosyev.mongodb.net/foodDb?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));
};

module.exports = connectDb;
