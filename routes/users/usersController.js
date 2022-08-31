const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./usersEntity');

const userController = {
  getUser: async (userId, successCB, errorCB) => {
    try {
      const user = await User.findById(userId).select('-password');
      successCB(user);
      // res.json(user);
    } catch (error) {
      errorCB(error.message);
      // res.status(500).send('Server error');
    }
  },
  registeruser: async (req, res, successCB, errorCB) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorCB({ errors: errors.array() });
      // return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, cpassword } = req.body;

    try {
      // see user existed or not
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        errorCB({ msg: 'User already exists' });
        // return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // checking re-entered password is same or not
      if (password !== cpassword) {
        errorCB({ msg: "Passwords doesn't match" });
        // return res.status(400).json({ errors: [{ msg: "Passwords doesn't match" }] });
      }

      // creating user object
      const user = new User({
        name,
        email,
        password,
      });

      // hashing the password before saving it in DB
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // saving user to DB
      await user.save();

      // creating payload
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      // signing our token
      jwt.sign(payload, 'myjwtsecret', { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        // res.json({ token });
        successCB({ token });
      });
    } catch (error) {
      console.error(error.message);
      errorCB('Server error');
      // res.status(500).send('Server error');
    }
  },
  loginUser: async (req, res, successCB, errorCB) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // see user existed or not
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        errorCB({ errors: [{ msg: 'No user found with this mail' }] });
        // return res.status(400).json({ errors: [{ msg: 'No user found with this mail' }] });
      }

      // checking password
      const isMatched = await bcrypt.compare(password, checkUser.password);
      if (!isMatched) {
        errorCB({ errors: [{ msg: 'Wrong password' }] });
        // return res.status(400).json({ errors: [{ msg: 'Wrong password' }] });
      }

      // creating payload
      const payload = {
        user: {
          id: checkUser.id,
        },
      };

      // signing our token
      jwt.sign(payload, 'myjwtsecret', { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        // res.json({ token });
        successCB({ token });
      });
    } catch (error) {
      console.error('sai');
      errorCB('server error');
      // res.status(500).send('Server error');
    }
  },
};

module.exports = userController;
