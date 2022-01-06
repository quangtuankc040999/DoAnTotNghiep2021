const Category = require('../models/Category')
class CategoryController{
    getCategory(req, res){
        Category.find({}, function(err, users){
            if(!err){res.json(users)}else{
                res.status(400).json({error: 'ERROR!'});
            }
        })
    }
}
module.exports = new CategoryController;