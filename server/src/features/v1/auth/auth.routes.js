const validate = require("../../../shared/middlewares/validate.middleware");
const { register } = require("./auth.controller");
const { registerSchema } = require("./auth.validator");

const router = require("express").Router();

router.route("/register").post(validate(registerSchema), register);

module.exports = router;
