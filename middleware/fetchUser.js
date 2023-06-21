//importing the packages
const jwt = require('jsonwebtoken');

//declaration of the secret key
const secretKey = 'your-secret-key';

//defining middleware
const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
    
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = fetchuser;
