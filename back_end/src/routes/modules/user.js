const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/UserController');
const { emailValidation } = require('../../middleware/validation');

router.post('/', emailValidation(), userController.searchByEmail);
router.get('/:id', emailValidation(), userController.getUser);
router.put('/:id', userController.editUser);
router.put('/cart/:id', userController.pushProductToCart)
router.put('/cart/update/:id', userController.updateQuantityProductFromCart)
router.put('/cart/remove/:id', userController.removeProductFromCart)
router.get('/cart/:id', userController.getProductCart)
module.exports = router;
                  