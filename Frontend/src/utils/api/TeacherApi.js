import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrl = baseUrl;
export const getAllStudents=async () => {
    try {
        const res = await axios.get(`${apiUrl}/teacher/students`);
        return res.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }   
};

export const addStudentMarks=async (data) => {
    const {  marks,name, program,username, semester } = data[0];
    try {
        const res = await axios.post(`${apiUrl}/teacher/students/addstudentmarks`, {
            name,
            username,
            marks,    
            program,
            semester
        });
        toast.success('Marks added successfully!');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const updateStudent = async (studentId, updatedData) => {
    try {
        const res = await axios.put(`${apiUrl}/teacher/students/${studentId}`, updatedData);
        return res.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};