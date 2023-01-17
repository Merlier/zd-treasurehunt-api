const path = require("path");
const fs = require("fs");
const token = require("jsonwebtoken");
const { randomBytes } = require("crypto");

const jwtPrivateKeyPath = path.join(__dirname, "/../jwt_private.pem");
const privateKey = fs.readFileSync(jwtPrivateKeyPath);
const config = require("../config");

const generateAccessToken = (user) => {
  return token.sign(
    {
      userId: user._id,
    },
    privateKey,
    { algorithm: "RS256", expiresIn: config.accessTokenDuration }
  );
};

const generateRefreshToken = (user) => {
  const buffer = randomBytes(256);
  return buffer.toString("hex");
};

module.exports = { generateAccessToken, generateRefreshToken };
