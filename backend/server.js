const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Mongo DB Connected")).catch(err=>console.log(err));

const user = require("./routes/userRoute");

app.use("/api", user);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})