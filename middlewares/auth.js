const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const extractJwtToken = (header) => header.replace('jwt=', '');

const auth = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !(cookie.startsWith('jwt='))) {
    next(new UnauthorizedError('Необходимо авторизироваться'));
  }

  const token = extractJwtToken(cookie);
  let payload;

  try {
    payload = jwt.verify(token, 'super_strong_password');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизироваться'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
