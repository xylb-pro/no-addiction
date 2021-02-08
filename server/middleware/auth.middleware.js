const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; //Bearer TOKEN

    //if no token found
    if (!token) {
      return res
        .status(401)
        .json({ message: 'No authorization found! No token found' });
    }

    //check token time
    //onlu for not google
    const { exp, iat } = jwt.decode(token);
    if (new Date() >= exp * 1000) {
      return res.status(401).json({ message: 'Token was expired' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: 'No authorization found' });
  }
};
