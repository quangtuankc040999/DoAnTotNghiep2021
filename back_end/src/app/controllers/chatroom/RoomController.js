const Room = require('../../models/Room')
const User = require('../../models/User');
const apiResponse = require('../../../utils/apiResponse');
const host = require('../../../utils/decodeJWT');
require('dotenv').config();


class RoomController {
    getRoomChatByUserId = async (req, res) => {
        const room = await Room.findOne({ member: host(req, res) });
        if (!room) {
            return apiResponse.ErrorResponse(
                res,
                'Not found room',
            );
        }
        return apiResponse.successResponseWithData(
            res,
            'Get room successfully',
            room
        );
    }
    getAllRoomChat = async (req, res) => {
        const room = await Room.find()
            .populate('createdBy')
            .populate('member');
        if (!room) {
            return apiResponse.ErrorResponse(
                res,
                'Not found room',
            );
        }
        return apiResponse.successResponseWithData(
            res,
            'Get room successfully',
            room
        );
    }
}
module.exports = new RoomController();