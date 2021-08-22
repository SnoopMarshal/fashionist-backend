const express = require("express")
const router = express.Router();
const auth = require("./../middleware/auth");
const CartController = require("./../controller/cart");

router.post("/", auth, CartController.addToCart);

module.exports = router;