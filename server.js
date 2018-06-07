const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
// API PUBLIC routes
const users = require("./routes/api/users/users");
const profiles = require("./routes/api/profiles/profiles");
const posts = require("./routes/api/posts/posts");
// Middle ware
const isVerify = require("./middleware/isVerify");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());
require("./config/passport")(passport);

// App routes
app.use("/api/user", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // sett static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
