import { hash } from "bcrypt";
import { getAllStudents,addStudentMarks,getStudentsMarks } from "../model/teachermodel.js";


export const getAllStudentsController = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};


export const addStudentMarksController = async (req, res) => {
  try {
    const data = req.body;  
    console.log("Received data in controller:", data);
    const result = await addStudentMarks(data);
    if (result) {
      res.status(200).json({ message: "Student marks added successfully" });
    } else {
      res.status(400).json({ message: "Failed to add student marks" });
    }
  } catch (error) {
    console.error("Error in addStudentMarksController:", error);
    res.status(500).json({ message: "Internal server error" });
  } 
};

export const getStudentsMarksController = async (req, res) => {
  const { username } = req.params;
  try {
    const marks = await getStudentsMarks(username);
    if (marks) {
      res.status(200).json(marks);
    } else {
      res.status(404).json({ message: "No marks found for this student" });
    } 
  } catch (error) {
    console.error("Error in getStudentsMarksController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





