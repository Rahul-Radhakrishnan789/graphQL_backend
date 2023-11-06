const jwt = require('jsonwebtoken')


const userAuth = (req,res,next) => {
    const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  jwt.verify(refreshToken,'rahul',(err,decoded) => {
    if(err){
        res.status(500).json({error:"authentication failed"})
    }
    else{
        next()
    }
})
}

module.exports = userAuth;