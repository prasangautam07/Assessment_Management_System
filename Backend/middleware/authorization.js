import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async(req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Authorization header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
     token = authHeader.split(" ")[1];

        //nedd to add PROCESS.ENV.JWT_SECRET
        jwt.verify(token, 'gsdkjghosdobg', (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      } 
      console.log(decoded);
      // Attach decoded user info to request
      req.user = decoded.user;

      next(); // ✅ Proceed to next middleware or controller
// ✅ Proceed to next middleware or controller
    });
  } else {
    res.status(401);
    throw new Error("No token provided");
  }
  
});

export default validateToken;
