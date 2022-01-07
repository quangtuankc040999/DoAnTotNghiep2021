const Product = require('../models/Product')
const apiResponse = require('../../utils/apiResponse')

class ProductController {
    // admin add product
    addNewProduct = async (req, res) => {
        const product = req.body;
        await Product.create(product);
        return apiResponse.successResponse(
            res,
            'Add new product successfully',
        );
    }
    // delete product
    deleteProduct = async(req, res) =>{
        await Product.findByIdAndUpdate(req.params.productId,
            {
                $set: {
                    is_deleted: true
                }
            });
        return apiResponse.successResponse(
            res,
            'Delete product successfully',
        );
    }
    // update product
    updateProduct = async (req, res) => {
        const product = req.body;
        await Product.findByIdAndUpdate(req.params.productId,
            {
                $set: {
                    title: product.title,
                    brand: product.brand,
                    product_key: product.product_key,
                    image: product.image,
                    starting_price: product.starting_price,
                    discount: product.discount,
                    sale_price: product.sale_price,
                    description: product.description,
                    category_name: product.category_name,
                    category_detail: product.category_detail
                }
            });
        return apiResponse.successResponse(
            res,
            'Update product successfully',
        );

    }
    getProductByCategoryName = async (req, res) => {
        const listProduct = await Product.find({ category_name: req.params.categoryName, is_deleted: false });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listProduct,
        );
    }
    getProductByCategoryNameAndCategoryDetail = async (req, res) => {
        const listProduct = await Product.find({ category_name: req.params.categoryName, category_detail: req.params.categoryDetail, is_deleted: false });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listProduct,
        );
    }
    getProductByBrand = async (req, res) => {
        const listProduct = await Product.find({ brand: req.params.brandName, is_deleted: false});
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listProduct,
        );
    }

}
module.exports = new ProductController;
