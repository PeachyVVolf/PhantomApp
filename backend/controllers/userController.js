const User = require("../models/userModel");
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