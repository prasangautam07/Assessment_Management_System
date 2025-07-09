import { createUser, getUserByUsername,getUserByEmail } from '../model/usermodel.js';
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken';


// @desc registr a new user
// @route POST /api/users/register
// @access Public

export const registerUser =async (req, res) => {
    const{email,username,program,password}=req.body;
    if(!email || !username || !program || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    // Check if user already exists
    const existingUserWithUsername =await getUserByUsername(username);
    const existingUserWithEmail = await getUserByEmail(email);
    if(existingUserWithUsername){
        res.status(400).json({ message: "User already exists with same username" });
        console.log(`Registration failed: User already exists with username ${username}`);
    }
    if(existingUserWithEmail){
        res.status(400).json({ message: "User already exists with same email" });
        console.log(`Registration failed: User already exists with email ${email}`);
    }
    
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = await createUser
    (email, username, program, hashedpassword);

    res.status(201).json({  
        id: newuser.id,
        email: newuser.email,
        username: newuser.username,
        program: newuser.program
        
        
    });
};

//@desc login a user
//@route POST/api/user/login
//@access public

export const loginUser = async(req,res)=>{
    console.log("Login request received");
    const {username,password} =req.body;
    if(!username || !password){
        res.status(400).json({ message: "Please fill all the fields" });
    }
    const user= await getUserByUsername(username);
   //compare password
  if(user && (await bcrypt.compare(password,user.password))){
    const accessToken =jsonwebtoken.sign(
        {
            user:{
                username:user.username,
                id:user.id
            },
        },
        'gsdkjghosdobg',// PROCESS.ENV.JWT_SECRET
        {
            expiresIn:"20s"
        }
    );
    res.status(200).json({
        accessToken,
    });

    }else{
    console.log(`Login failed: Invalid username or password for ${username}`);
    res.status(401).json({ message: "Invalid username or password" });
  }
};


export const validateUser= async(req,res)=>{
    const token=req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    try {
        const decoded = jsonwebtoken.verify(token, 'gsdkjghosdobg'); // PROCESS.ENV.JWT_SECRET
        req.user = decoded.user;
        return res.status(200).json({ user: req.user });
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }   
}


