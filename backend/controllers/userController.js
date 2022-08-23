const User = require("../models/userModel");
const LobbyUser = require("../models/lobbyUserModel");
const catchAsyncErrors = require("../middlewear/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// RegisterUser
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const { walletAddress } = req.body;
    const userExists = await User.findOne( { walletAddress: walletAddress } );
    if(userExists){
        res.status(200).json({
            user: userExists,
        })
        return;
    }
    const user = await User.create({
        walletAddress: walletAddress
    });
    res.status(201).json({
        user,
        messages: "User Created"
    })
});

//Get User
exports.getUserData = catchAsyncErrors(async(req, res, next) => {
    const { username } =  req.body;
    const user = await User.findOne( { walletAddress: username } );
    if(!user){
        return next(new ErrorHandler(`User Not Found: ${username}`, 404));
    }

    res.status(200).json({
        user: user,
    });    
})

// Update Username
exports.updateUsername = catchAsyncErrors(async(req, res, next) => {
    const { username, walletAddress } = req.body;
    const userExists = await User.findOne( { username: username } );
    if(userExists){
        res.status(200).json({
            user: userExists,
            message: "Username exists"
        })
        return;
    }
    const userFind = await User.findOne( { walletAddress: walletAddress } );
    if(!userFind){
        return next(new ErrorHandler("User Not Found", 404));
    }
    userFind.username = username;
    await userFind.save();
    res.status(201).json({
        user: userFind,
        messages: "UserName Edited"
    })
});

// update profile pic
exports.updateProfilePic = catchAsyncErrors(async(req, res, next) => {
    const { url, walletAddress } = req.body;
    const userFind = await User.findOne( { walletAddress: walletAddress } );
    if(!userFind){
        return next(new ErrorHandler("User Not Found", 404));
    }
    userFind.url = url;
    await userFind.save();
    res.status(201).json({
        user: userFind,
        messages: "User Profile Image Edited"
    })
});

// Join Lobby
exports.joinLobby = catchAsyncErrors(async(req, res, next)=>{
    const { walletAddress } = req.body;
    const lobbyId = req.params.id;
    const user = await User.findOne( {walletAddress:walletAddress} );
    if(!user){
        return next(new ErrorHandler("User Not Found", 404));
    }
    const lobby = await LobbyUser.findOne( { lobbyID:lobbyId} );
    if(!lobby){
        return next(new ErrorHandler("Lobby Doesn't Exist", 404));
    }
    const userInLobby = await LobbyUser.find({ "lobbyID":lobbyId, "users.userID":user._id })
    console.log(userInLobby);
    if(userInLobby != null){
        lobby.users.push(user._id);
        await lobby.save();
        res.status(201).json({
            lobby,
            message: "Joined Lobby"
        })
    }
    else{
        return next(new ErrorHandler("User Already in Lobby", 401));
    }
})

// Get all users in lobby
exports.getLobbyUsers = catchAsyncErrors(async(req, res, next)=>{
    const lobbyId = req.params.id;
    const lobby = await LobbyUser.findOne({lobbyID:lobbyId});
    if(!lobby){
        return next(new ErrorHandler("Lobby Doesn't Exist", 404));
    }
    let allUsers = [];
    for(let i = 0; i<lobby.users.length; i++){
        const userName = await User.findOne({_id:lobby.users[i]._id});
        if(userName!=null){
            allUsers.push(userName.username)
        }
    }
    res.status(200).json({
        allUsers,
    })
})

// Set UserStaus
exports.setUserStatus = catchAsyncErrors(async(req, res, next)=>{
    console.log(req.body);
    res.status(200).json({
        message: "Usr Online"
    })
})