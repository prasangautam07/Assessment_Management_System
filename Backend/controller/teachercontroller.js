import { hash } from "bcrypt";
import { createTeacher,getallteachers,updateTeacher,deleteTeacherbyid } from "../model/teachermodel.js";
import { hashPassword } from "../utils/hash.js";



export const addTeacher = async (req, res) => {
    const { email,username, subject, assignedclass, password } = req.body;

    try{
        const hashedpassword= await hashPassword(password);
        const userid= await createTeacher(email, username, subject, assignedclass, hashedpassword);
        res.status(201).json({
            success: true,
            message: "Teacher added successfully",
            userId: userid
        });
    }
    catch (error) {
        console.error("Error adding teacher:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add teacher",
            error: error.message
        });
    }
};

export const getAllTeachers = async (req, res) => {
    try{
        const teachers = await getallteachers();
        res.status(200).json(teachers);
    }catch (error) {
        res.status(500).json({message: "Failed to fetch teachers"});
    }
};

export const updatedTeachercontroller= async(req,res)=>{
    const{userId,subject,assignedclass}= req.body;
     
    if(!userId || !subject || !assignedclass){
        return res.status(400).json({
            message: "all fields are required"
        });
    }

    try{
        const result= await updateTeacher(userId,subject,assignedclass);
        res.status(200).json({
            success: true,
            message: "teacher updated",
            data :  result
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message : "failed to update teacher",
            error : error.message
        });
    }

};

export const deleteTeacher= async(req,res)=>{
    const  userId = req.params.id;

    if (!userId)
    {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const result =await deleteTeacherbyid(userId);
      res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      deleted: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};