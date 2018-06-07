const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// API PUBLIC routes
const users = require("./routes/api/users/users");
const profiles = require("./routes/api/profiles/profiles");
const posts = require("./routes/api/posts/posts");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());
require("./config/passport")(passport);

// first route
app.get("/", (req, res) => res.send("Hello world!"));

// App routes
app.use("/api/user", users);
app.use("/api/profiles", profiles);
// app.use("/api/posts", posts);

// DB config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running`));
