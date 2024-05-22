const jwt=require("jsonwebtoken");
// Middleware to authenticate using JWT
const authenticateToken = (req, res, next) => {
  let token = req.header("authorization");
    // let token = req.cookies['x-access-token'];
    if (!token) return res.status(401).send('Access Denied');
  
    try {
        const SECRET_KEY = 'your_jwt_secret_key';
      const verified = jwt.verify(token, SECRET_KEY);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  };
  module.exports=authenticateToken