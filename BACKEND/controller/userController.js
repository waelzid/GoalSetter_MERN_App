const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User= require('../model/usermodel');
//const { find, findById } = require('../model/usermodel');




//@desc register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req,res) =>{
    const { name, email, password}=req.body;
    if(!name ||!email||!password){
        res.status(400);
        throw new Error('please fill in all the fields')
    }
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400);
        throw new Error('this email already exists ')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);

    const user = await User.create({name,
    email,
    password:hashedPassword})
if (user){res.status(200).json({
    _id:user.id,
    name:user.name,
    email:user.email,
token:generateToken(user._id)})
}
else{
    res.status(400)
    throw new Error('user not created')
}
    //res.json({message:"Register User"});
});

//@desc register new user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req,res) =>{
    const {email, password}=req.body;

    //check for user email
    const user = await User.findOne({email});
    if ( user &&(await bcrypt.compare(password,user.password))){
        res.json({_id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),})
    }
    else {
        res.status(400)
        throw new Error('invalid credentials');
    }
    //res.json({message:"login User"})
});


//@desc get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req,res) =>{
    const {_id,name,email}=await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email, 
    })
    //res.json({message:" User data"})
});


//generate a token
const generateToken= (id) =>{
    return(jwt.sign({ id },'abc123',{
        expiresIn:'30d',//d stands for days 
    }))
}



module.exports={
    registerUser,
    loginUser,
    getMe,
}