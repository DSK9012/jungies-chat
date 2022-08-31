const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middlewares/authToken');
const userController = require('./usersController');

//  @route GET /user
//  @desc Get and verify user on every req
//  @access Public
router.get('/user', auth, async (req, res) => {
  try {
    userController.getUser(
      req.user,
      (user) => res.status(200).json(user),
      (error) => res.status(404).json(error)
    );
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
  // try {
  //   const user = await User.findById(req.user.id).select('-password');
  //   res.json(user);
  // } catch (error) {
  //   res.status(500).send('Server error');
  // }
});

//  @route POST /user/register
//  @desc Registering user
//  @access Public
router.post(
  '/user/register',
  [
    check('name', 'User name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('name', 'Must be greater than 3 and less than 20 characters').isLength({ min: 3, max: 20 }),
    check('email', 'Plesae enter a valid mail').isEmail(),
    check('password', 'Must be greater than 6 and less than 20 characters').isLength({ min: 6, max: 20 }),
  ],
  async (req, res) => {
    try {
      userController.registeruser(
        req,
        res,
        (token) => res.status(200).json(token),
        (error) => res.status(404).json(error)
      );
    } catch (error) {
      return res.status(500).json('Internal server error');
    }
  }
);

//  @route POST /user/login
//  @desc  User login
//  @access Public
router.post(
  '/user/login',
  [check('email', 'Please enter a valid mail').isEmail(), check('password', 'Password is required').not().isEmpty()],
  async (req, res) => {
    try {
      userController.loginUser(
        req,
        res,
        (token) => res.status(200).json(token),
        (error) => res.status(404).json(error)
      );
    } catch (error) {
      return res.status(500).json('Internal server error');
    }
  }
);

module.exports = router;
