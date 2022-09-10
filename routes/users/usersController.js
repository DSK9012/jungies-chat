const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./usersEntity');

const userController = {
  getUser: async (user, successCB, errorCB) => {
    try {
      const userInfo = await User.findById(user.id).select('-password');
      return successCB(userInfo);
      // res.json(userInfo);
    } catch (error) {
      return errorCB(error.message);
      // res.status(500).send('Server error');
    }
  },
  registeruser: async (req, res, successCB, errorCB) => {
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorCB({ errors: errors.array() });
      // return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, confirmPassword } = req.body;

    try {
      // see user existed or not
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return errorCB({ msg: 'User already exists' });
        // return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // checking re-entered password is same or not
      if (password !== confirmPassword) {
        return errorCB({ msg: "Passwords doesn't match" });
        // return res.status(400).json({ errors: [{ msg: "Passwords doesn't match" }] });
      }

      // creating user object
      let user;
      if (req?.file?.buffer) {
        user = new User({
          name,
          email,
          password,
          avatar: req.file.buffer,
        });
      } else {
        user = new User({
          name,
          email,
          password,
        });
      }

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
        return successCB({ id: user.id, token });
      });
    } catch (error) {
      console.error(error.message);
      return errorCB('Server error');
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
        return errorCB({ errors: [{ msg: 'No user found with this mail' }] });
        // return res.status(400).json({ errors: [{ msg: 'No user found with this mail' }] });
      }

      // checking password
      const isMatched = await bcrypt.compare(password, checkUser.password);
      if (!isMatched) {
        return errorCB({ errors: [{ msg: 'Wrong password' }] });
        // return res.status(400).json({ errors: [{ msg: 'Wrong password' }] });
      }

      // creating payload
      const payload = {
        user: {
          id: checkUser.id,
          name: checkUser.name,
        },
      };

      // signing our token
      jwt.sign(payload, 'myjwtsecret', { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        // res.json({ token });
        return successCB({ id: checkUser.id, token });
      });
    } catch (error) {
      console.error('sai');
      return errorCB('server error');
      // res.status(500).send('Server error');
    }
  },
  sendAvatar: async (req, res, successCB, errorCB) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user || !user.avatar) throw new Error('User not found');

      res.set('Content-Type', 'image/jpg');
      return successCB(user.avatar);
    } catch (error) {
      return errorCB(error);
    }
  },
  searchUsers: async (req, res, successCB, errorCB) => {
    try {
      console.log(req.query);
      const query = new RegExp(req.query.search, 'i');
      const users = await User.find({ name: query }).select('-password').select('-avatar');
      return successCB(users);
    } catch (error) {
      return errorCB(error);
    }
  },
};

module.exports = userController;
