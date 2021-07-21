const express = require('express');
const router = express.Router();

const CategoryController = require('./../controller/category');

router.get('', CategoryController.getCategories);

module.exports = router;