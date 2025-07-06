const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const {createuser,getuserbyemail}= require("../model/usermodel");
const validateauth= require("../middleware/authorization");



// @desc registr a new user
// @route POST /api/users/register
// @access Public

const registeruser =asyncHandler(async (req, res) => {
    const{email,username,program,password}=req.body;
    if(!email || !username || !program || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    // Check if user already exists
    const existinguser =await getuserbyemail(email);
    if(existinguser){
        res.status(400);
         console.log(`Registration failed: User already exists with email ${email}`);
        throw new Error("User already exists");
    }
    
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = await createuser
    (email, username, program, hashedpassword);

    res.status(201).json({  
        id: newuser.id,
        email: newuser.email,
        username: newuser.username,
        program: newuser.program
        
        
    });
});

//@desc login a user
//@route POST/api/user/login
//@access public

const loginuser = asyncHandler(async(req,res)=>{
    console.log("Login request received");
    const {email,password} =req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Loin failed ! please fill all the fields");
    }
    const user= await getuserbyemail(email);
   //compare password
  if(user && (await bcrypt.compare(password,user.password))){
    const accessToken =jsonwebtoken.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"1d"
        }
    );
    res.status(200).json({
        accessToken,
    });

    }else{
    console.log(`Login failed: Invalid email or password for ${email}`);
      res.status(401);
    throw new Error("Email or password is not valid");
  }
});


module.exports = {registeruser,loginuser};