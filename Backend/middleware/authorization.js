import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
   console.log("Inside validateToken middleware");
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    console.log("JWT verification failed:", err.message);
    res.status(401);
    throw new Error("User is not authorized");
  }
  console.log("JWT decoded successfully:", decoded);
  req.user = decoded.user;
  next();

    });
  } else {
    res.status(401);
    throw new Error("No token provided");
  }
});

export default validateToken;
