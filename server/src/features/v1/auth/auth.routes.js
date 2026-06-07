const { register } = require("./auth.controller");

const router = require("express").Router();

router.route("/register").post(register);

module.exports = router;
