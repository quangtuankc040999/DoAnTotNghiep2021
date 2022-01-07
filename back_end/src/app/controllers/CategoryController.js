const Category = require('../models/Category')
const apiResponse = require('../../utils/apiResponse')
class CategoryController {
    getCategory = async (req, res) => {
        const listCategory = await Category.find();
        return apiResponse.successResponseWithData(
            res,
            'Get all category successfully',
            listCategory,
        );
    }
    createCategory = async (req, res) => {
        const categogy = req.body;
        await Category.create(categogy);
        return apiResponse.successResponse(
            res,
            'Add category successfully',
        );
    }
    updateCategory = async (req, res) => {
        const categoryDetails = req.body;
        await Category.findByIdAndUpdate(req.params.categoryId,{$push: {categoryDetails: categoryDetails}});
        return apiResponse.successResponse(
            res,
            'Update category successfully',
        );
    }
}
module.exports = new CategoryController;