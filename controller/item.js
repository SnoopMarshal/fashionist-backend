
const Item = require('./../models/Item');
const Category = require('./../models/Category');
const addMultiple = require('../middleware/uploadfile');
const SubCategory = require('./../models/Subcategory');
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req,res,next).catch(next)
    }
}
exports.addItem = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.body.categoryId)
    if (!category) {
        return res.status(400).json({status: "fail",msg: "Category does not exist!"})
    }
    const subCategory = await SubCategory.findById(req.body.subCategoryId)
    if (!subCategory) {
        return res.status(400).json({status: "fail",msg: "Subcategory does not exist!"})
    }
    const newItem = new Item({
        name: req.body.name,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        price: req.body.price,
        description: req.body.description,
        photos: req.files.map(img => img.key)
    })
    await newItem.save();

    res.status(200).json({status: "success", msg: "Item saved"})
})

exports.getItem = catchAsync( async(req, res, next) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        return res.status(500).json({status: "fail", msg: "Item not found"})
    }
    res.status(200).json({status: "success", data: item});
})