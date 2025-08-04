import axios from "axios";
const localHost=false;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrl = localHost ? 'http://localhost:3000/api' : baseUrl;

export const getStudentMarks= async (username) => {
    try {
        const result = await axios.get(`${apiUrl}/teacher/students/get-marks/${username}`);
        const grouped = {};
        result.data.forEach(({ semester, subject, marks }) => {
        if (!grouped[semester]) grouped[semester] = [];
        grouped[semester].push({ subject, marks,semester });
        });
        console.log('Fetched student marks:', grouped);
        return grouped;
    } catch (error) {
        console.error('Error fetching student marks:', error);
        throw error;
    }
};
