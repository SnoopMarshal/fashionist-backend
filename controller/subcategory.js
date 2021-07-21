const SubCategory = require('./../models/Subcategory')


const catchAsync = fn => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}
exports.addSubCategory = catchAsync(async (req,res,next) => {
    const subCategory = await SubCategory.findOne({name: req.body.name});
    if (subCategory) {
        res.status(401).json({status: 'fail', msg: "Already exists!"});
    }
    const subcategory = new SubCategory({
        name: req.body.name,
        categoryId: req.body.categoryId
    });
    await subcategory.save();

    res.status(200).json({status: 'success', msg: 'Subcategory added'})
})
exports.getSubcategories = async (req, res, next) => {
    try {
        const subcategory = await SubCategory.find()
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}