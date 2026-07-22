const {
  verifyRefreshToken,
  verifyToken,
} = require("../../../shared/middlewares/auth.middleware");
const validate = require("../../../shared/middlewares/validate.middleware");
const {
  register,
  login,
  getAccessToken,
  getMe,
  logout,
  changePassword,
} = require("./auth.controller");
const {
  registerSchema,
  loginSchema,
  passwordChangeSchema,
} = require("./auth.validator");

const router = require("express").Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/logout").post(logout);
router.route("/refresh").post(verifyRefreshToken, getAccessToken);
router.route("/me").get(verifyToken, getMe);
router
  .route("/password")
  .put(verifyToken, validate(passwordChangeSchema), changePassword);

module.exports = router;
