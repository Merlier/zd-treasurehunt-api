const User = require("../models/user.js");

const create = async (req) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    permissions: req.body.permissions,
  };

  return await User.create(userData);
};

const get = async (req) => {
  const user = await User.findOne(
    { _id: req.tokenData?.userId },
    { email: 1, permissions: 1 }
  );
  if (!user) {
    throw { status: 400, message: "Incorrect parameters" };
  }

  return user;
};

module.exports = { create, get };
