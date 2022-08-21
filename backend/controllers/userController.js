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