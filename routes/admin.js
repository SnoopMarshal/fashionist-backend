const express = require("express")
const router = express.Router();
const auth = require("./../middleware/auth");
const CategoryController = require("./../controller/category")
const SubCategoryController = require("./../controller/subcategory")
router.post("/category", auth, CategoryController.addCategory)
router.post("/subcategory", auth, SubCategoryController.addSubCategory)

module.exports = router;