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
        name: 'jacket'
    });
    await subcategory.save();

    res.status(200).json({status: 'success', msg: 'Subcategory added'})
})