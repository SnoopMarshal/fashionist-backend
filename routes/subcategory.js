const express = require('express');
const router = express.Router();
const SubcategoryController = require('./../controller/subcategory')

router.get('', SubcategoryController.getSubcategories);

module.exports = router;