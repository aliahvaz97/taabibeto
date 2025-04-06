const jwt = require("jsonwebtoken");

// بررسی توکن و نقش
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "دسترسی غیرمجاز" });
    }

    try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      req.user = decoded;

      // بررسی نقش
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "شما مجوز لازم را ندارید" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "توکن نامعتبر است" });
    }
  };
};

module.exports = authorizeRole;
