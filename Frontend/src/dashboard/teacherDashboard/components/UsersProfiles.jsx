import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllStudents } from '@utils/api/TeacherApi';

const StudentInfoCell = ({ name }) => (
    <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                {name && name.charAt(0)}
            </div>
        </div>
        <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{name}</div>
        </div>
    </div>
);

export const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            const studentsData = await getAllStudents();
            setStudents(studentsData || []);
            setIsLoading(false);
        };
        fetchStudents();
    }, []);

    const handleEditClick = (studentId) => {
        setIsModalOpen(!isModalOpen);
        Navigate(`/teacher/dashboard/edit-student/${studentId}`);
    };

    // Filtering logic
    const filteredStudents = students.filter(student => {
        let programMatch = true;
        let yearMatch = true;
        if (selectedProgram) {
            programMatch = student.program === selectedProgram;
        }
        if (selectedYear) {
            yearMatch = student.username && student.username.slice(3, 6) === selectedYear;
        }
        return programMatch && yearMatch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const getAcademic_year = (username) => {
        return username.slice(3, 6);
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    };

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProgram, selectedYear]);

    if (isLoading) {
        return <div className="p-8">Loading Students...</div>;
    }

    return (
        <div className="flex flex-col bg-gray-50 p-2 sm:p-6 lg:p-4">
            <div className='flex justify-evenly items-center mb-6'>
                <select
                    name="program"
                    className='w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'
                    value={selectedProgram}
                    onChange={e => setSelectedProgram(e.target.value)}
                >
                    <option value="">Select Program</option>
                    <option value="BEI">BEI</option>
                    <option value="BCT">BCT</option>
                    <option value="BCE">BCE</option>
                </select>
                <select
                    name="year"
                    className='w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value)}
                >
                    <option value="">Select Year</option>
                    <option value="078">2078</option>
                    <option value="079">2079</option>
                    <option value="080">2080</option>
                    <option value="081">2081</option>
                </select>
            </div>
            <div className="flex flex-col w-full bg-white rounded-lg shadow-md">
                <header className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800">Student Roster</h1>
                </header>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentStudents.map((student, index) => (
                                <tr key={`${student.id}-${index}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap"><StudentInfoCell name={student.name} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-start">2{getAcademic_year(student.username)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{student.program}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{student.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleEditClick(student.id)} className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150 cursor-pointer"><Pencil /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-700">
                        Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                    </span>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};