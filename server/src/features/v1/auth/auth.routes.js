const {
  verifyRefreshToken,
  verifyToken,
} = require("../../../shared/middlewares/auth.middleware");
const validate = require("../../../shared/middlewares/validate.middleware");
const { register, login, getAccessToken, getMe } = require("./auth.controller");
const { registerSchema, loginSchema } = require("./auth.validator");

const router = require("express").Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/refresh").post(verifyRefreshToken, getAccessToken);
router.route("/me").get(verifyToken, getMe);

module.exports = router;
