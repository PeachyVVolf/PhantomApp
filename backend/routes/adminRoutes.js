const express = require("express");
const { createLobby, getAllLobbies } = require("../controllers/adminController");
const router = express.Router();

router.route("/admin/createLobby").post(createLobby);
router.route("/lobbies").get(getAllLobbies);

module.exports = router;