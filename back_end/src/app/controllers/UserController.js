const db = require('../../config/database/index');
const User = require('../models/User')

class UserController{
    getUser(req, res){
        User.find({}, function(err, users){
            if(!err){res.json(users)}else{
                res.status(400).json({error: 'ERROR!'});
            }
        })
    }
}
module.exports = new UserController;