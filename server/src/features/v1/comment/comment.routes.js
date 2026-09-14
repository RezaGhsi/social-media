const router = require("express").Router();

const { verifyToken } = require("../../../shared/middlewares/auth.middleware");
const validate = require("../../../shared/middlewares/validate.middleware");
const { createComment, getPostComments } = require("./comment.controller");
const { newCommentSchema } = require("./comment.validator");

router.route("/").post(verifyToken, validate(newCommentSchema), createComment);

router.route("/post/:postId").get(verifyToken, getPostComments);

module.exports = router;
