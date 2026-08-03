const router = require("express").Router();
const validate = require("../../../shared/middlewares/validate.middleware");
const {
  verifyToken,
} = require("./../../../shared/middlewares/auth.middleware");
const { likePost, disLikePost } = require("./like.controller");
const { likeSchema } = require("./like.validator");

router.route("/").post(verifyToken, validate(likeSchema), likePost);
router.route("/").delete(verifyToken, validate(likeSchema), disLikePost);

module.exports = router;
