const router = require("express").Router();

const { followUser, unFollowUser } = require("./follow.controller");
const {
  verifyToken,
} = require("./../../../shared/middlewares/auth.middleware");

router
  .route("/:username")
  .post(verifyToken, followUser)
  .delete(verifyToken, unFollowUser);

module.exports = router;
