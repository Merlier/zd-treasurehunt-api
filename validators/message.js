const { body } = require("express-validator");

const messageValidator = () =>
  body("message")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 1000 })
    .trim()
    .withMessage("Message must have between 5 and 1000 characters");

module.exports = messageValidator;
