const express = require("express")
const router = express.Router();
const auth = require("./../middleware/auth");
const CategoryController = require("./../controller/category")

router.post("/category", auth, CategoryController.addCategory)


module.exports = router;