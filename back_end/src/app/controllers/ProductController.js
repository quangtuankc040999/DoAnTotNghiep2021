const Product = require('../models/Product')
const apiResponse = require('../../utils/apiResponse')

class ProductController {
    // admin add product
    addNewProduct = async (req, res) => {
        const product = req.body;
        // console.log(product);
        const productCreated = await Product.create(product);
        return apiResponse.successResponseWithData(
            res,
            'Add new product successfully',
            productCreated
        );
    }
    // delete product
    deleteProduct = async (req, res) => {
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
        const productFind = await Product.findById(req.params.productId)
        if (product.quantity) {
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
                        category_detail: product.category_detail,
                        inventory: product.quantity + productFind.inventory,
                        import_price: product.import_price
                    }
                });
        }
        else {
            await Product.findByIdAndUpdate(req.params.productId,
                {
                    $set: {                        
                        import_price: product.import_price,
                        title: product.title,
                        brand: product.brand,
                        product_key: product.product_key,
                        image: product.image,
                        starting_price: product.starting_price,
                        discount: product.discount,
                        sale_price: product.sale_price,
                        description: product.description,
                        category_name: product.category_name,
                        category_detail: product.category_detail,
                        inventory: product.inventory
                    }
                });
        }

        return apiResponse.successResponse(
            res,
            'Update product successfully',
        );

    }

    getProductByBrand = async (req, res) => {
        const listProduct = await Product.find({ brand: req.params.brandName, is_deleted: false });
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listProduct,
        );
    }
    getAllProduct = async (req, res) => {
        const listProduct = await Product.find({ is_deleted: false });
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listProduct,
        );
    }
    getProduct = async (req, res) => {
        const product = await Product.findById(req.params.productId);
        return apiResponse.successResponseWithData(
            res,
            'Get product successfully',
            product
        );
    }


    getProductByCategoryName = async (req, res) => {
        let limit = 9
        const listProduct = await Product.find({ category_name: req.params.categoryName, is_deleted: false }).limit(limit).skip(limit * (req.params.page - 1));
        const numberRecord = await Product.find({ category_name: req.params.categoryName, is_deleted: false }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listProduct": listProduct, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            data,
        );
    }
    getProductByCategoryNameAndCategoryDetail = async (req, res) => {
        let limit = 9
        const listProduct = await Product.find({ category_name: req.params.categoryName, category_detail: req.params.categoryDetail, is_deleted: false }).limit(limit).skip(limit * (req.params.page - 1));
        const numberRecord = await Product.find({ category_name: req.params.categoryName, category_detail: req.params.categoryDetail, is_deleted: false }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listProduct": listProduct, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            data,
        );
    }
    getAllProductPagination = async (req, res) => {
        let limit = 9
        const listProduct = await Product.find({ is_deleted: false }).limit(limit).skip(limit * (req.params.page - 1));
        const numberRecord = await Product.find({ is_deleted: false }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listProduct": listProduct, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            data
        );
    }
    getAllProductByPrice = async (req, res) => {
        let limit = 9
        const listProduct = await Product.find({
            is_deleted: false,
            sale_price: { $gt: req.body.minPrice, $lt: req.body.maxPrice }

        }).limit(limit).skip(limit * (req.params.page - 1));

        const numberRecord = await Product.find({ is_deleted: false, sale_price: { $gt: req.body.minPrice, $lt: req.body.maxPrice } }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listProduct": listProduct, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            data
        );
    }
    getAllProductByBrand = async (req, res) => {
        let limit = 9
        const listProduct = await Product.find({
            is_deleted: false,
            brand: req.body.brand
        }).limit(limit).skip(limit * (req.params.page - 1));
        const numberRecord = await Product.find({
            is_deleted: false,
            brand: req.body.brand
        }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listProduct": listProduct, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            data
        );
    }
    getAllProductLikeName = async (req, res) => {
        let limit = 9
        let title = req.body.title;
        const listProduct = await Product.find({
            is_deleted: false,
            title: { $regex: ".*" + title + ".*" }
        }).limit(limit).skip(limit * (req.params.page - 1));
        const numberRecord = await Product.find({
            is_deleted: false,
            title: { $regex: ".*" + title + ".*" }
        }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listProduct": listProduct, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            data
        );
    }

    getAllProductLikeNameNoPanigation = async (req, res) => {
        let title = req.body.title;
        const listProduct = await Product.find({
            is_deleted: false,
            inventory: { $gt: 0 },
            title: { $regex: ".*" + title + ".*" }
        });
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listProduct
        );
    }



}
module.exports = new ProductController;
