const express = require("express");
const { registerUser, getUserData, updateUsername, updateProfilePic } =  require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/user").post(getUserData);
router.route("/user/edit").post(updateUsername);
router.route("/user/editPic").post(updateProfilePic);

module.exports = router;