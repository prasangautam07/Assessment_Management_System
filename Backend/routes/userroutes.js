const express = require('express');
const router = express.Router();



const{registeruser,loginuser }= require('../controller/usercontroller');
const validateToken= require("../middleware/authorization");

router.post('/register', registeruser);
router.post('/login', loginuser);
// router.get('/current', currentuser);

module.exports = router;