const Category = require("./../models/Category")
exports.addCategory = async (req, res, next) => {
    try {
        const category = await Category.findOne({ name: req.body.name })
        if (category) {
            res.status(400).json({ msg: 'Category already exists' });
        }

        const newCategory = new Category({
            name: req.body.name
        })
        await newCategory.save();
        res.status(200).json({ msg: 'Category added' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}