const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    products: {
        type: [{productId: mongoose.Types.ObjectId, qty: Number}],
    }
})

const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;