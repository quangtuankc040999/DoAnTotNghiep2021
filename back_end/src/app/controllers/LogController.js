const Log = require('../models/Log')
const Product = require('../models/Product')
const apiResponse = require('../../utils/apiResponse')
const endOfDay = require('date-fns/endOfDay');
const endOfMonth = require('date-fns/endOfMonth');
const startOfMonth = require('date-fns/startOfMonth');
const startOfDay = require('date-fns/startOfDay');
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
    createLogXuat = async (req, res) => {
        let logBody = req.body
        let logContents = []
        for (let log of logBody.logContents) {
            let logContent = {}
            const product = await Product.findById(log.idProduct)
            const quantity = log.quantity
            logContent = { 'product': product, 'quantity': quantity }
            logContents.push(logContent)
        }
        let logParam = new Log();
        logParam.status = logBody.status;
        logParam.logContents = logContents;
        const newLog = await Log.create(logParam)
        return apiResponse.successResponseWithData(
            res,
            'Create log successfully',
            newLog,
        );
    }
    getAllLogByTime = async (req, res) => {
        const listLog = await Log.find({ "createdAt": { $gte: startOfDay(new Date(req.params.date)), $lte: endOfDay(new Date(req.params.date)) } }).populate("logContents.product")
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listLog,
        );
    }
    getAllLogStatistical = async (req, res) => {
        const month = new Date(req.body.month)
        const listLog = await Log.find({
            status: "Xuất hàng", "createdAt": {
                $gte: startOfMonth(month),
                $lte: endOfMonth(month)
            }
        }).populate("logContents.product")
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            listLog,
        );

    }
}
module.exports = new LogController();