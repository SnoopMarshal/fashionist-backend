const mongoose = require('mongoose');
import ItemModel from './Item';

const WishlistSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: [ItemModel]
    }
})

const Wishlist = mongoose.model('wishlist', WishlistSchema);
module.exports = Wishlist;