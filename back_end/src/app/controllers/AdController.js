const apiResponse = require('../../utils/apiResponse');
const Advertisement = require('../models/Advertisement')
class AdController {
    createNewAd = async (req, res) => {
        let AdParams = req.body;
        let ad = new Advertisement();
        ad.adBanner = AdParams.blogCoverPhoto;
        ad.linkBlog = `/blog/detail/${AdParams.blogId}`;
        const adCreated = await Advertisement.create(ad);
        return apiResponse.successResponse(
            res,
            'Add new blog successfully',
        );
    }
    getAllAd = async (req, res) => {
        const listAdd = await Advertisement.find().sort({createdAt: -1}).limit(4);
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listAdd
        );
    }
}
module.exports = new AdController();