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
        const comment = await Ratting.find({"product.idProduct": req.params.productId}).populate('createdBy');
        return apiResponse.successResponseWithData(
            res,
            'Add new comment successfully',
            comment
        );
    }
}
module.exports = new RattingController;