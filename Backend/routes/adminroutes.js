import express from 'express';
import validateToken from '../middleware/authorization.js';
import isAdmin from '../middleware/admin.js';
import { addTeacher,getAllTeachers,updatedTeachercontroller,deleteTeacher } from '../controller/teachercontroller.js';
import  {addAdmin}  from '../controller/admincontroller.js';




const router = express.Router();

router.post('/admins',validateToken,isAdmin,addAdmin);
router.post('/teachers',validateToken, isAdmin, addTeacher);
router.get('/teachers', validateToken, isAdmin, getAllTeachers);
router.put('/teachers',validateToken,isAdmin,updatedTeachercontroller)
router.put('/teachers',validateToken,isAdmin,deleteTeacher)


export default router;