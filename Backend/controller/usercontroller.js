import {
  createUser,
  getUserByUsername,
  getUserByEmail,
} from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { connectToDatabase } from "../database/db.js";

// @desc registr a new user
// @route POST /api/users/register
// @access Public

export const registerUser = async (req, res) => {
  const { email, username, program, password } = req.body;
  if (!email || !username || !program || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

    // Check if user already exists
  const existingUserWithUsername = await getUserByUsername(username);
  const existingUserWithEmail = await getUserByEmail(email);
  if (existingUserWithUsername) {
    res.status(400).json({ message: "User already exists with same username" });
    console.log(
      `Registration failed: User already exists with username ${username}`
    );
  }
  if (existingUserWithEmail) {
    res.status(400).json({ message: "User already exists with same email" });
    console.log(`Registration failed: User already exists with email ${email}`);
    }
    
    const hashedpassword = await bcrypt.hash(password, 10);
  const newuser = await createUser(email, username, program, hashedpassword);

    res.status(201).json({  
        id: newuser.id,
        email: newuser.email,
        username: newuser.username,
        program: newuser.program,
    });
};

//@desc login a user
//@route POST/api/user/login
//@access public

export const loginUser = async (req, res) => {
    console.log("Login request received");
  const { username, password } = req.body;
  if (!username || !password) {
        res.status(400).json({ message: "Please fill all the fields" });
    }
  const user = await getUserByUsername(username);
   //compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jsonwebtoken.sign(
        {
        user: {
          username: user.username,
          id: user.id,
            },
        },
      "gsdkjghosdobg", // PROCESS.ENV.JWT_SECRET
        {
        expiresIn: "20m",
        }
    );
    res.status(200).json({
      accessToken,
    });
  } else {
    console.log(`Login failed: Invalid username or password for ${username}`);
    res.status(401).json({ message: "Invalid username or password" });
  }
};

export const validateUser = async (req, res) => {
  const db = await connectToDatabase();
  const username = req.user.username;

  const result = await db.query(
    `SELECT users.id, users.email, users.username, users.program,
            studetData.name, studetData.roll, studetData.contact_no,
            studetData.gender, studetData.dob, studetData.category
     FROM users
     INNER JOIN studetData ON users.username = studetData.roll
     WHERE users.username = $1`,
    [username]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user: result.rows[0] });
};
