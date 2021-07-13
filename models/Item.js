const mongoose = require('mongoose');

const ItemScheema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    }
});

const ItemModel = mongoose.model("item", ItemScheema);
module.exports = ItemModel