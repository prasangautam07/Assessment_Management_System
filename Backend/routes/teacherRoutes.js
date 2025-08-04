import express from 'express';
import validateToken from '../middleware/authorization.js';
import isAdmin from '../middleware/admin.js';
import {getAllStudentsController,addStudentMarksController,getStudentsMarksController} from '../controller/teachercontroller.js';



const router = express.Router();


/**
 * @swagger
 * /api/teacher/students:
 *   get:
 *     summary: Get all students
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   program:
 *                     type: string
 *       500:
 *         description: Server error
 */

router.get('/students',getAllStudentsController);

router.post('/students/addstudentmarks',addStudentMarksController);

router.get('/students/get-marks/:username',  getStudentsMarksController);


export default router;