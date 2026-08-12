const router = require("express").Router();
const { savePost, getSavedPosts, unSavePost } = require("./save.controller");
const {
  verifyToken,
} = require("./../../../shared/middlewares/auth.middleware");
const validate = require("../../../shared/middlewares/validate.middleware");
const { saveSchema } = require("./save.validator");

router
  .route("/:postId")
  .post(verifyToken, validate(saveSchema, "params"), savePost)
  .delete(verifyToken, validate(saveSchema, "params"), unSavePost);

router.route("/").get(verifyToken, getSavedPosts);

module.exports = router;
