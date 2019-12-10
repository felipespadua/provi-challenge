require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function verifyJWT(req, res, next){
  const { token } = req.body
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  
    req.userId = decoded.id;
    next();
  });
}


