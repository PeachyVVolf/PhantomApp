const mongoose = require("mongoose");

const lobbyUserSchema = new mongoose.Schema({
    lobbyID: {
        type:mongoose.Schema.ObjectId,
        required: true
    },
    users: [
        {
            userID: {
                type:mongoose.Schema.ObjectId,
                required:false
            }
        }
    ],
});

module.exports = mongoose.model("LobbyUser", lobbyUserSchema);