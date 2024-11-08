const jwt = require('jsonwebtoken');

function authentication(role) {
  return function(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // Log token to see if it's being sent
    console.log("Token received:", token);

    // If no token is found, return a 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      // If the token is invalid or expired, return a 401 Unauthorized response
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      req.userEmail = decoded.email;

      console.log("Decoded user info:", decoded);

      // If a role is specified, check if the user has the correct role
      if (role &&  !role.includes(req.userRole)) {
        // User does not have the correct role, return 403 Forbidden
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }

      // Proceed to the next middleware or route handler if everything is valid
      next();
    });
  };
}

module.exports = authentication;
