const User = require('../models/User');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();

class UserController {
  searchByEmail = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          apiResponse.ErrorResponse(res, 'Not found user');
        }
        return apiResponse.successResponseWithData(
          res,
          'Get User successfully',
          user,
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  };
  getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      apiResponse.ErrorResponse(res, 'Not found user');
    }
    return apiResponse.successResponseWithData(
      res,
      'Get User successfully',
      user,
    );
  };
  editUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
          apiResponse.ErrorResponse(res, 'Not found user');
        }
        return apiResponse.successResponseWithData(
          res,
          'Edit User successfully',
          user,
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  };
  pushProductToCart = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const userId = req.params.id;
        const productCart = req.body
        const user = await User.findByIdAndUpdate(userId, { $push: { productCart: productCart } });
        if (!user) {
          apiResponse.ErrorResponse(res, 'Not found user');
        }
        return apiResponse.successResponseWithData(
          res,
          'Edit Product Cart successfully',
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
  updateQuantityProductFromCart = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const userId = req.params.id;
        const productCart = req.body
        const user = await User.updateOne({ userId, "productCart.idProduct": productCart.idProduct }, { $set: { "productCart.$.quantity": productCart.quantity + productCart.quantity_old } });
        if (!user) {
          apiResponse.ErrorResponse(res, 'Not found user');
        }
        return apiResponse.successResponseWithData(
          res,
          'Edit Product Cart successfully',
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
  getProductCart = async (req, res) => {
    const productCart = await User.findById(req.params.id, { productCart: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get product cart successfully',
      productCart,
    );
  }
  removeProductFromCart = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const userId = req.params.id;
        const productCart = req.body
        const user = await User.updateOne({userId},{$pull: {'productCart': { idProduct: productCart.idProduct }}});
        if (!user) {
          apiResponse.ErrorResponse(res, 'Not found user');
        }
        return apiResponse.successResponseWithData(
          res,
          'Delete Product Cart successfully',
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
}

module.exports = new UserController();
