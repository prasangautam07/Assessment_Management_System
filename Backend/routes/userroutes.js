import express from 'express';
const router = express.Router();
import { loginUser,registerUser} from '../controller/usercontroller.js';
import validateToken from '../middleware/authorization.js';



router.post('/register', registerUser);


router.post('/login', loginUser);
router.get('/validate', validateToken, (req, res) => {
    res.json({
        username: req.user.username,
        id: req.user.id,
        role: req.user.role
    });
});
export default  router;