const express = require("express");
const app = express();
const dotenv = require("dotenv");

//Config
dotenv.config({path:"backend/config/config.env"});

app.use(express.json());

//Routes
const user = require("./routes/userRoute");

app.use("/api", user);

module.exports = app 