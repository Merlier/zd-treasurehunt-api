const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");

/* GET root */
router.get("/", function (req, res, next) {
  res.json({
    name: "API",
    version: "1.0",
    status: 200,
    message: "Bienvenue sur l'API !",
  });
});

router.use("/", authRouter);
router.use("/user", userRouter);

module.exports = router;
