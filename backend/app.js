const express = require("express");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("./config/db");
const { verifyUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("*", verifyUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Images upload
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(helmet());
module.exports = app;
