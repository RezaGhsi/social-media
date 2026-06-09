const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    biography: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      uppercase: true,
    },
  },
  { timestamps: true },
);

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password);
});

const model = mongoose.model("User", schema);

module.exports = model;
