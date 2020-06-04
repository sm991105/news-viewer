const express = require("express");
require("./db/mongoose"); // holy fucking shit !!!!!!
const User = require("./db/models/User");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
// test server
app.get("/api/test", (req, res) => {
  res.send("Welcome!");
});

// login
app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      return user.comparePassword(req.body.password); // define method
    })
    .then((user) => {
      res.cookie("AuthCookie", user.token).send(user);
    })
    .catch((e) => {
      res.send({ error: "Wrong email or password" });
    });
});

// Register
app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateToken();
    user.token = token;
    await user.save();
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

// Logout
app.get("/api/users/logout", (req, res) => {
  res.cookie("AuthCookie", "").send(res.cookie.AuthCookie);
});

app.patch("/api/users/update/password", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.currentPassword,
    });
    if (!user) {
      res.send("Wrong current password");
    } else {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.newPassword },
        { runValidators: true }
      );
      res.send("Password updated");
    }
  } catch (e) {
    res.send("Password must have at least 8 characters.");
  }
});

// Authenticate
app.get("/api/users/authenticate", async (req, res) => {
  const token = req.cookies.AuthCookie; // asd1234
  const user = await User.findOne({ token });
  res.send(user);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}.`);
});
