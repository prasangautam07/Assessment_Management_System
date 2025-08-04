import axios from "axios";
const localHost=false;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrl = localHost ? 'http://localhost:3000/api' : baseUrl;
export const getAllStudents=async () => {
    try {
        const res = await axios.get(`${apiUrl}/teacher/students`);
        console.log('Fetched students:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }   
};

export const addStudentMarks=async (data) => {
    console.log("Data to add student marks:", data[0]);
    const {  marks,name, program,username, semester } = data[0];
    console.log("Adding student marks:", { name, username, marks, program, semester });
    try {
        const res = await axios.post(`${apiUrl}/teacher/students/addstudentmarks`, {
            name,
            username,
            marks,    
            program,
            semester
        });
        console.log('Added student marks:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error adding student marks:', error);
        throw error;
    }
};

export const updateStudent = async (studentId, updatedData) => {
    try {
        const res = await axios.put(`${apiUrl}/teacher/students/${studentId}`, updatedData);
        console.log('Updated student:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};