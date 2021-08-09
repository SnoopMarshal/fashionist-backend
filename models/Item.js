const mongoose = require('mongoose');
const ItemScheema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
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
    thumbnail: {
        type: String,
        // required:true
    },
    photos: [{
        type: String
    }]
});

const ItemModel = mongoose.model("item", ItemScheema);
module.exports = ItemModel