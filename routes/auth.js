const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const emailValidator = require("../validators/email.js");
const passwordValidator = require("../validators/password.js");
const authService = require("../services/auth");

/* Login User */
router.post(
  "/login",
  [emailValidator(), passwordValidator()],
  async (req, res, next) => {
    try {
      const output = await authService.login(req);
      res.status(200).json(output);
    } catch (error) {
      next(error);
    }
  }
);

/* Refresh User */
router.post(
  "/refresh",
  [
    body("refreshToken")
      .isString()
      .not()
      .isEmpty()
      .trim()
      .withMessage("RefreshToken is empty"),
  ],
  async (req, res, next) => {
    try {
      const output = await authService.refresh(req);
      res.status(200).json(output);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
