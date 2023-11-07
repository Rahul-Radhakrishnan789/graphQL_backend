const jwt = require('jsonwebtoken');

  const authMiddleware = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, 'rahul'); 
        req.user = decoded.user.userName; 
      } catch (error) {
        console.log('Invalid token');
      }
    }


    return req;
  };

module.exports = {authMiddleware}
