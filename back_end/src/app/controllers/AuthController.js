const User = require('../models/User');
const Role = require('../models/Role');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const host = require('../../utils/decodeJWT');
const Room = require('../models/Room');

require('dotenv').config();

class AuthController {
  register = [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error',
            errors.array(),
          );
        } else {
          const salt = await bcrypt.genSalt(10);
          let user = new User();
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.password = await bcrypt.hash(req.body.password, salt);
          user.avatar = "";
          const admin = await User.findOne({ email: 'admin@gmail.com' })
          const role = await Role.findOne({ name: 'User' })
          user.role = role;
          const newUser = await User.create(user)
          const newRoom = await Room.create({ member: user, createdBy: admin })
          return apiResponse.successResponseWithData(
            res,
            'register success',
            newUser,
          );
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];

  login = [
    async (req, res) => {
      console.log(req.body);
      const { email, password } = req.body;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error',
            errors.array(),
          );
        }
        const user = await User.findOne({ email });
        if (!user) {
          return apiResponse.ErrorResponse(res, 'Email không đúng');
        }
        const role = await Role.findById(user.role);
        let roleName = role.name
        bcrypt.compare(password, user.password, (error, isValid) => {
          if (!isValid) {
            return apiResponse.ErrorResponse(res, 'Mật khẩu không trùng khớp');
          } else {
            const tokenCreated = jwt.sign(
              {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: roleName
              },
              process.env.TOKEN_SECRET,
              { expiresIn: process.env.JWT_TIMEOUT_DURATION },
            );
            let userData = {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              token: tokenCreated,
              password: user.password,
            };
            User.findByIdAndUpdate(
              user._id,
              userData,
              {},
              function (err) {
                if (err) {
                  return apiResponse.ErrorResponse(res, err);
                } else {
                  return apiResponse.successResponseWithData(
                    res,
                    'Login success',
                    userData,
                  );
                }
              },
            )
          }
        });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];
  getUserInfor = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        return apiResponse.successResponseWithData(
          res,
          'user information',
          user,
        );
      });
    },
  ];
}
module.exports = new AuthController();