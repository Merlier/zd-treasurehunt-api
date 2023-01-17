const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

const verifyToken = (req, res, next) => {
  const jwtPublicKeyPath = path.join(__dirname, "/../jwt_public.pem");
  const cert = fs.readFileSync(jwtPublicKeyPath);

  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new Error();
    }
    req.tokenData = jwt.verify(token, cert);
    next();
  } catch (err) {
    res.status(401).json({ message: "Access forbidden" });
  }
};

module.exports = verifyToken;
