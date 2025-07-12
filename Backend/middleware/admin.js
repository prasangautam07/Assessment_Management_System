const isAdmin = (req, res, next) => {
    console.log("User from token:", req.user); 
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied: Admins only");
  }
};

export default isAdmin;
