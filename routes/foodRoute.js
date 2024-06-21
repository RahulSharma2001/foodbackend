const express = require("express");
const foodController = require("../controllers/foodController");

const multer = require("multer");

const router = express.Router();

//Image Storage

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), foodController.addFood);
router.get("/list", foodController.listFood);
router.delete("/remove", foodController.removeFood);
module.exports = router;
