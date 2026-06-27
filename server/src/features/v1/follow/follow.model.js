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

const model = mongoose.model("Follow", schema);

module.exports = model;
