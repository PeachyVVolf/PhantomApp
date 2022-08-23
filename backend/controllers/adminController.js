const Lobby = require("../models/lobbyModel");
const LobbyUser = require('../models/lobbyUserModel');
const User = require('../models/userModel');
const catchAsyncErrors = require("../middlewear/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// CreateLobby
exports.createLobby = catchAsyncErrors(async(req, res, next) => {
    const { lobbyName, betAmount, createdBy } = req.body;
    const userFind = await User.findOne( { walletAddress: createdBy } );
    if(!userFind){
        return next(new ErrorHandler("User Not Found", 404));
    }
    const lobbyExists = await Lobby.findOne( { lobbyName } );
    if(lobbyExists){
        return next(new ErrorHandler("Lobby Name Exists", 401));
    }
    const lobby = await Lobby.create({
        lobbyName,
        betAmount,
        createdBy:userFind._id
    });
    const lobbyUser = await LobbyUser.create({
        lobbyID: lobby._id
    })
    res.status(201).json({
        lobby,
        messages: "Lobby Created"
    })
});

//Get all Lobbies
exports.getAllLobbies = catchAsyncErrors(async(req, res, next)=>{
    const lobbies =  await Lobby.find();
    if(!lobbies){
        return next(new ErrorHandler("No Lobbies Found", 404));
    }
    res.status(200).json({
        lobbies
    })
})