const foodModel = require("../models/foodModel");
const fs = require("fs");

/* add food */

const addFood = async (req, res) => {
  let image_fiilename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_fiilename,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Addded",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

//All Food List

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      data: "Errror",
    });
  }
};

//remove foodItem

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error(`Failed to delete image file: ${err.message}`);
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food Removed",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: " remove Error",
    });
  }
};

const foodController = {
  addFood,
  listFood,
  removeFood,
};

module.exports = foodController;
