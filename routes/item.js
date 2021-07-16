const express = require("express")
const router = express.Router()
const ItemController = require("./../controller/item");

router.get("/", ItemController.getAllItem)
router.get("/:id", ItemController.getItem)

module.exports = router;