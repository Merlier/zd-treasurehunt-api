const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const emailValidator = require("../validators/email.js");
const passwordValidator = require("../validators/password.js");
const verifyToken = require("../middlewares/verifyToken.js");
const userService = require("../services/user");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const hasPermissions =
  (...args) =>
  async (req, res, next) => {
    try {
      let isAllowed = false;
      const user = await User.findOne(
        { _id: req.tokenData?.userId },
        { email: 1, permissions: 1 }
      );
      if (!user) {
        throw { status: 400, message: "Incorrect parameters" };
      }

      console.log(user.permissions);

      let i = 0;
      while (!isAllowed && i < args.length) {
        console.log(args[i]);
        if (user.permissions.includes(args[i])) {
          isAllowed = true;
        }
        i++;
      }

      if (!isAllowed) {
        throw { status: 401, message: "Access forbidden" };
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Access forbidden" });
    }
  };

/* POST add user */
router.post(
  "/",
  [emailValidator(), passwordValidator()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const output = await userService.create(req);
      return res.status(200).json(output);
    } catch (err) {
      if (err && err.code === 11000) {
        err = { status: 400, message: "User already exists" };
      }
      next(err);
    }
  }
);

/* GET user */
router.get(
  "/",
  [verifyToken, hasPermissions("get_user")],
  async (req, res, next) => {
    try {
      const output = await userService.get(req);
      return res.status(200).json(output);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
