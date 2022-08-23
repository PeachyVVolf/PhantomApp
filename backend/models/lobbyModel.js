const mongoose = require("mongoose");

const lobbySchema = new mongoose.Schema({
    lobbyName: {
        type:String,
        required: true
    },
    betAmount: {
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    }
});

module.exports = mongoose.model("Lobby", lobbySchema);