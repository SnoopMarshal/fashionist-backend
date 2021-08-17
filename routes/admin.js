const express = require("express")
const router = express.Router();
const auth = require("./../middleware/auth");
const upload = require("./../middleware/uploadfile")
const CategoryController = require("./../controller/category")
const SubCategoryController = require("./../controller/subcategory")
const ItemController = require("./../controller/item")

// post routes
router.post("/category", auth, CategoryController.addCategory)
router.post("/subcategory", auth, SubCategoryController.addSubCategory)
router.post("/item", auth, upload.upload.array("files"),  ItemController.addItem)
module.exports = router;