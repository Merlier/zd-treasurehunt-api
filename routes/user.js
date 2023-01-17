const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const emailValidator = require("../validators/email.js");
const passwordValidator = require("../validators/password.js");
const verifyToken = require("../middlewares/verifyToken.js");
const userService = require("../services/user");

/* POST add user */
router.post(
  "/",
  [
    emailValidator(),
    passwordValidator(),
  ],
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
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const output = await userService.get(req);
    return res.status(200).json(output);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
