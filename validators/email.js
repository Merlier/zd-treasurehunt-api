const { body } = require("express-validator");

const emailValidator = () => body("email").normalizeEmail().isEmail();

module.exports = emailValidator;
