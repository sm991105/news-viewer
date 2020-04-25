const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// Before saving the record, encrypt plain password into hash
userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// comparePassword method
userSchema.methods.comparePassword = function (plainPass, callback) {
  var user = this;
  bcrypt.compare(plainPass, user.password, function (err, result) {
    if (err) {
      callback(err, null);
    }
    callback(null, result);
  });
};

// checkEmail method
userSchema.methods.checkEmail = function (email, callback) {
  User.findOne({ email: email }, function (err, user) {
    console.log(user);
    callback(err, user);
  });
};

var User = mongoose.model("User", userSchema);
module.exports = { User };
