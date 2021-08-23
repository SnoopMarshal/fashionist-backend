const express = require("express")
const router = express.Router();
const auth = require("./../middleware/auth");
const CartController = require("./../controller/cart");

router.post("/", auth, CartController.addToCart);
router.post("/remove", auth, CartController.removeFromCart);
module.exports = router;