const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    walletAddress: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required:false,
    },
    url:{
        type: String,
        required: false
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    connectionStatus:{
        type:Boolean,
        required:true,
        default:true
    }
});

module.exports = mongoose.model("User", userSchema);