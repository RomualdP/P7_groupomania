const express = require("express");
const userRoutes = require("./routes/user.routes");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
require("./config/db");
const { verifyUser } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan());

//Routes
app.use("/api/user", userRoutes);

app.use(helmet());
module.exports = app;
