const express = require("express");
const { registerUser, getUserData, updateUsername, updateProfilePic, joinLobby, getLobbyUsers, setUserStatus } =  require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/user").post(getUserData);
router.route("/user/edit").post(updateUsername);
router.route("/user/editPic").post(updateProfilePic);
router.route("/lobby/:id").post(joinLobby);
router.route("/lobby/:id").get(getLobbyUsers);
router.route("/userStatus").post(setUserStatus);

module.exports = router;