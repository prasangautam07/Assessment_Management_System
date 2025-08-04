import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async(req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Authorization header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
     token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    console.log("JWT verification failed:", err.message);
    res.status(401).json({ message: "User is not authorized" });
  }
      console.log(decoded);
  req.user = decoded.user;
  next();

    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
  
});

export default validateToken;
