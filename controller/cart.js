const Cart = require("../models/Cart");
const User = require("./../models/User");
const Item = require("./../models/Item");


const catchAsync = fn => {
    return (req, res, next) => {
        fn(req,res,next).catch(next)
    }
}
exports.addToCart = catchAsync(async (req, res, next) => {
    const userId = req.body.userId;
    const product = req.body.product;
    try {
        const cart = await Cart.findOne({userId: userId});
        console.log(cart);
        const cartProduct = cart.products;


        if (cart) {
            let cartItems = cartProduct.reduce((acc, curr) => {
                acc[curr.productId] = curr;
                return acc;
            }, {});
            if (cartItems[product.productId]) {
                cartItems[product.productId].qty += product.qty;
            } else {
                cartItems[product.productId] = product;
            }
            console.log(cartItems);
            cart.products = Object.values(cartItems);
            await cart.save();
            return res.status(200).json({status: "success", msg: "Cart Item updated"})
        }
        const userCart = new Cart({
            userId, products
        });

        await userCart.save();

        res.status(200).json({status: "success", msg: "Cart Item added"})

    } catch (error) {
        
    }
})