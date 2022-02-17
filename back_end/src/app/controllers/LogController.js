const Log = require('../models/Log')
const apiResponse = require('../../utils/apiResponse')
const Product = require('../models/Product')
class LogController {
    createLog = async (req, res) => {
        let log = req.body
        let logContents = []
        for (let log1 of log.logContents) {
            let logContent = {}
            const product = await Product.findById(log1._id)
            const quantity = log1.quantity
            logContent = { 'product': product, 'quantity': quantity }
            logContents.push(logContent)
        }
        let logParam = new Log();
        logParam.status = log.status;
        logParam.logContents = logContents;
        const newLog = await Log.create(logParam)
        return apiResponse.successResponseWithData(
            res,
            'Create log successfully',
            newLog,
        );
    }
}
module.exports = new LogController();