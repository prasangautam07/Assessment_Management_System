import express from 'express';
const router = express.Router();
import { loginUser,registerUser,validateUser} from '../controller/usercontroller.js';
import validateToken from '../middleware/authorization.js';



router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/validate:
 *   get:
 *     summary: Validate a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.get('/validate', validateToken, (req, res) => {
    res.json({
        username: req.user.username,
        id: req.user.id,
        role: req.user.role
    });
});


// router.get('/current', currentuser);

export default  router;