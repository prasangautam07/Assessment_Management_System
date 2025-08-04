import React, { useState, useEffect } from 'react';
import {Pencil} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {getAllStudents} from '@utils/api/TeacherApi';

export const initialStudents = [
    { id: 's101', name: 'John Doe', standing: 'Good', Academic_year: 2079,  category: 'regular' ,semester:4},
    { id: 's102', name: 'Jane Smith', standing: 'Probation', Academic_year: 2079, category: 'regular',semester:4 },
    { id: 's103', name: 'Peter Jones', standing: 'Warning', Academic_year: 2079,  category: 'fullfee',semester:4 },
    { id: 's104', name: 'Emily White', standing: 'Good', Academic_year: 2079,  category: 'regular' ,semester:4},
    { id: 's105', name: 'Chris Green', standing: 'Good', Academic_year: 2079,  category: 'fullfee' ,semester:4},
    { id: 's106', name: 'John Doe1', standing: 'Good', Academic_year: 2079,  category: 'regular',semester:4 },
    { id: 's107', name: 'Jane Smith1', standing: 'Probation', Academic_year: 2079, category: 'regular' ,semester:4},
    { id: 's108', name: 'Peter Jones1', standing: 'Warning', Academic_year: 2079,  category: 'fullfee' ,semester:4},
    { id: 's109', name: 'Emily White1', standing: 'Good', Academic_year: 2079,  category: 'regular',semester:4 },
    { id: 's110', name: 'Chris Green1', standing: 'Good', Academic_year: 2079,  category: 'fullfee',semester:4 },
    { id: 's111', name: 'John Doe2', standing: 'Good', Academic_year: 2079,  category: 'regular',semester:4 },
    { id: 's112', name: 'Jane Smith2', standing: 'Probation', Academic_year: 2079, category: 'regular' ,semester:4},
    { id: 's113', name: 'Peter Jones2', standing: 'Warning', Academic_year: 2079,  category: 'fullfee',semester:4 },
    { id: 's114', name: 'Emily White2', standing: 'Good', Academic_year: 2079,  category: 'regular',semester:4 },
    { id: 's115', name: 'Chris Green2', standing: 'Good', Academic_year: 2079,  category: 'fullfee',semester:4 },
    { id: 's116', name: 'John Doe3', standing: 'Good', Academic_year: 2079,  category: 'regular',semester:4 },
    { id: 's117', name: 'Jane Smith3', standing: 'Probation', Academic_year: 2079, category: 'regular',semester:4 },
    { id: 's118', name: 'Peter Jones3', standing: 'Warning', Academic_year: 2079,  category: 'fullfee' ,semester:4},
    { id: 's119', name: 'Emily White3', standing: 'Good', Academic_year: 2079,  category: 'regular',semester:4 },
    { id: 's120', name: 'Chris Green3', standing: 'Good', Academic_year: 2079,  category: 'fullfee',semester:4 },
];

const StudentInfoCell = ({ name }) => (
    <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                {name.charAt(0)}
            </div>
        </div>
        <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{name}</div>
        </div>
    </div>
);

const StatusPill = ({ standing }) => {
    const statusStyles = {
        Good: 'bg-green-100 text-green-800',
        Warning: 'bg-yellow-100 text-yellow-800',
        Probation: 'bg-red-100 text-red-800',
    };

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[standing] || 'bg-gray-100 text-gray-800'}`}>
            {standing}
        </span>
    );
};


export const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    
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
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(students.length / itemsPerPage);

    const getAcademic_year = (year) => {
        return year.slice(3,6);
    }

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };
    
    const handlePrevPage = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    };


    if (isLoading) {
        return <div className="p-8">Loading Students...</div>;
    }

    return (
        <div className="flex flex-col bg-gray-50 p-2 sm:p-6 lg:p-4">
            <div className='flex justify-evenly items-center mb-6'>
                <select name="program" id="" className='w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'>
                    <option value="">Select Program</option>
                    <option value="1">BEI</option>
                    <option value="2">BCT</option>
                    <option value="3">BCE</option>
                </select>
                <select name="semester" id="" className='w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'>
                    <option value="">Select Year</option>
                    <option value="1">2078</option>
                    <option value="2">2079</option>
                    <option value="3">2080</option>
                    <option value="3">2081</option>
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Standing</th>
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
                                    <td className="px-6 py-4 whitespace-nowrap"><StatusPill standing={student.standing} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-start">2{getAcademic_year(student.username)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{student.program}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{student.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleEditClick(student.id)} className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150 cursor-pointer"><Pencil/></button>
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