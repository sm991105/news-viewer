const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to mongoDB
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log(err);
  });

// Home router
app.get("/", (req, res) => {
  res.send("This is a server for the NewsViewer.");
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~");
});

// Register router
app.post("/users/register", (req, res) => {
  var user = new User(req.body); // new record

  user.checkEmail(req.body.email, function (err, result) {
    if (result != null) {
      return res.json({ success: false, message: "User already exists." });
    }
    if (err) {
      return res.json({ success: false, err });
    }
    user.save((err) => {
      if (err) {
        res.json({ success: false, err });
      }
      res.json({ success: true, email: user.email }).status(200);
    });
  });
});

// Login router
app.post("/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.json({ loginSuccess: false, message: "User not found." });
    }
    user.comparePassword(req.body.password, function (err, result) {
      if (err) {
        return res.json({
          loginSuccess: false,
          message: "Wrong password.",
        });
      }
      user.generateToken((err) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.cookie("toughcookie", user.token).status(200).json({
          loginSuccess: true,
          email: user.email,
          cookie: req.cookies,
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
