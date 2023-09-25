const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, "jwtPassword");
    console.log(decoded);
    if (decoded.user.role !== "admin") {
      return res.status(403).send("Not authorized for admin access");
    }

    next();
  } catch (err) {
    return res.status(500).send("Token is not valid");
  }
}

module.exports = adminAuth;
