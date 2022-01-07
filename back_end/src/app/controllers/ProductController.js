const Product = require('../models/Product')
const apiResponse = require('../../utils/apiResponse')

class ProductController{
    // admin add product
    addNewProduct = async (req, res) => {
        const product = req.body;
        await Product.create(product);
        return apiResponse.successResponse(
            res,
            'Add new product successfully',
        );
    }
    getProductByCategoryName = async (req,res) =>{
        const listProduct = await Product.find({ category_name: req.params.categoryName});
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listProduct,
        );
    }
    getProductByCategoryNameAndCategoryDetail = async (req,res) =>{
        const listProduct = await Product.find({ category_name: req.params.categoryName, category_detail: req.params.categoryDetail});
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listProduct,
        );
    }
    getProductByBrand = async (req,res) =>{
        const listProduct = await Product.find({ brand: req.params.brandName});
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listProduct,
        );
    }

}
module.exports = new ProductController;
