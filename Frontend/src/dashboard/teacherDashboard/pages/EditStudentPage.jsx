import React,{useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditStudentsModal } from '../components/EditStudentsModal'; 
import { getAllStudents } from '../../../utils/api/TeacherApi';
import { addStudentMarks } from '../../../utils/api/TeacherApi';

export const EditStudentPage = () => {
    const [initialStudents, setInitialStudents] = useState([]);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchStudents = async () => {
            const studentsData = await getAllStudents();
            setInitialStudents(studentsData || []);
            setLoading(false); 
        };
        fetchStudents();
    }, []);
    const { studentId } = useParams(); 
    const navigate = useNavigate();
    const studentToEdit = initialStudents.find(s => s.id == studentId);

    const handleClose = (e) => {
        e.preventDefault();
        navigate('/teacher/dashboard'); 
    };

    const handleSave = async (updatedStudent) => {
        setLoading(true);
        const updatedStudentsData=[{
            name: updatedStudent.name,
            username: updatedStudent.roll,
            marks: updatedStudent.marks,
            program: updatedStudent.program,
            semester: updatedStudent.semester
        }]
        const res = await addStudentMarks(updatedStudentsData);
        setLoading(false);
        event.preventDefault();
        navigate('/teacher/dashboard');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                    <svg className="animate-spin h-8 w-8 text-primary mb-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    <span className="font-semibold">Loading...</span>
                </div>
            </div>
        );
    }

    if (!studentToEdit) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold">Student not found!</h2>
                <button onClick={handleClose} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <EditStudentsModal
            student={studentToEdit}
            onClose={handleClose}
            onSave={handleSave}
            loading={loading}
        />
    );
};