const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Like", schema);

module.exports = model;
