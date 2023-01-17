const { body } = require("express-validator");

const passwordValidator = () =>
  body("password").custom((value) => {
    if (value.length < 6) {
      return Promise.reject("Password should have at least 6 chars");
    }
    return Promise.resolve();
  });

module.exports = passwordValidator;
