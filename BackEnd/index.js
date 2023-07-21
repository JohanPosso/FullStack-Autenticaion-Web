const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
app.use(bodyparser.json());
bodyparser.urlencoded({ extended: false });
app.use(cors({ origin: process.env.FRONT_URI, credentials: true }));
app.use(cookieParser());

// index.js
const allRoutes = require("./routes/index");

allRoutes(app);

app.listen(port, () => {
  console.log("Server Running in port: " + port);
});
