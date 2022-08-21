const express = require("express");
const { registerUser, getUserData } =  require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/user").post(getUserData);

module.exports = router;