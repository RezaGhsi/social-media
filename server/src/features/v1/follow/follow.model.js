const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  following: {
    type: String,
    required: true,
    index: true,
  },
  follower: {
    type: String,
    required: true,
    index: true,
  },
});

schema.virtual("followingUser", {
  ref: "User",
  localField: "following",
  foreignField: "username",
});

schema.virtual("followerUser", {
  ref: "User",
  localField: "follower",
  foreignField: "username",
});

const model = mongoose.model("Follow", schema);

module.exports = model;
