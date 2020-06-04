const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config/keys");

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useMongoClient: true,
  })
  .then(() => console.log("Connected to MongoDB."))
  .catch((e) => {
    console.log(e);
  });
