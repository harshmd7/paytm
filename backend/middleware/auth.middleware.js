const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
   const token = authHeader.split(' ')[1];
   try {
    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user data in req.user for later use
    console.log(decoded);
    
    req.user = decoded;

    next(); // Proceed to next middleware or route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = isAuthenticated;
