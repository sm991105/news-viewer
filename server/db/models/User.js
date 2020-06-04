const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email.");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
});

userSchema.methods.comparePassword = function (password) {
  const user = this;
  if (password === user.password) {
    return user;
  }
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = await jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "999 years",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
