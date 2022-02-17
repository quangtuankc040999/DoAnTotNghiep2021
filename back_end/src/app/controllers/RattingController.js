const Ratting = require('../models/Ratting')
const User = require('../models/User')
const apiResponse = require('../../utils/apiResponse')
const host = require('../../utils/decodeJWT');
class RattingController {
    // POST new comment 
    postNewComment = async (req, res) => {
        const user = await User.findById(host(req, res));
        const comment = req.body;
        comment.createdBy = user
        await Ratting.create(comment);
        return apiResponse.successResponse(
            res,
            'Add new comment successfully',
        );
    }
    getCommentByProductId = async (req, res) => {
        let limit = 3
        const comments = await Ratting.find({ "product.idProduct": req.params.productId }).populate('createdBy').limit(limit).skip(limit * (req.params.page - 1));
        const numberComment = await Ratting.collection.find({ "product.idProduct": req.params.productId }).count()
        const listComments  = await Ratting.find({ "product.idProduct": req.params.productId });
        const totalStar = listComments.reduce( (total, commnent) => total + commnent.star,
        0)
        const starAvg = Math.ceil(totalStar / numberComment)
        let numberPages = Math.ceil(numberComment / limit)
        let data = { "listComment": comments, "numberPages": numberPages, 'numberComment': numberComment, 'starAvg': starAvg }
        return apiResponse.successResponseWithData(
            res,
            'Add new comment successfully',
            data
        );
    }
}
module.exports = new RattingController;