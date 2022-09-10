const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    if (!token) {
      return next(new Error({ msg: 'No token, authorization denied' }));
    }

    // verify token
    const decodedToken = jwt.verify(token, 'myjwtsecret');
    socket.user = decodedToken.user;

    next();
  } catch (error) {
    return next(new Error({ msg: 'Token is not valid' }));
  }
};
