const bcrypt = require("bcrypt");

const User = require("../models/user.js");
const Connection = require("../models/connection.js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.js");
const config = require("../config");

const login = async (req) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw { status: 401, message: "Incorrect credentials" };
  }

  const validPassword = await bcrypt.compare(userData.password, user.password);

  if (!validPassword) {
    throw { status: 401, message: "Incorrect credentials" };
  }

  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  const refreshTokenExpirationDate = new Date();
  refreshTokenExpirationDate.setFullYear(
    refreshTokenExpirationDate.getFullYear() + config.refreshTokenDuration
  );

  const connectionData = {
    refreshToken,
    refreshTokenExpirationDate,
    user: user._id,
    ip: req.socket.remoteAddress,
    userAgent: req.get("User-Agent"),
  };

  const connection = await Connection.create(connectionData);

  return { token, refreshToken };
};

const refresh = async (req) => {
  const connection = await Connection.findOne({
    refreshToken: req.body.refreshToken,
  }).populate("user");

  const user = await User.findOne({ _id: connection?.user });
  if (!user) {
    throw new Error();
  }

  const token = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken();
  const refreshTokenExpirationDate = new Date();
  refreshTokenExpirationDate.setFullYear(
    refreshTokenExpirationDate.getFullYear() + config.refreshTokenDuration
  );

  connection.refreshToken = newRefreshToken;
  connection.refreshTokenExpirationDate = refreshTokenExpirationDate;

  await connection.save();

  return { token, refreshToken: newRefreshToken };
};

module.exports = { login, refresh };
