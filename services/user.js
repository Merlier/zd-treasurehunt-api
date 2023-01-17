const User = require("../models/user.js");

const create = async (req) => {
  const userData = {
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: req.body.password,
    organization: req.body.organization,
    address: req.body.address,
  };

  return await User.create(userData);
};

const get = async (req) => {
  const user = await User.findOne(
    { _id: req.tokenData?.userId },
    { pseudo: 1, email: 1, organization: 1, address: 1 }
  );
  if (!user) {
    throw { status: 400, message: "Incorrect parameters" };
  }

  return user;
};

module.exports = { create, get };
