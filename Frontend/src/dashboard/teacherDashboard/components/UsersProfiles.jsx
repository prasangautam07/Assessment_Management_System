import React, { useState, useEffect } from 'react';

const initialStudents = [
    { id: 's101', name: 'John Doe', standing: 'Good', semester: 3, overallAvg: 88, gpa: 3.5 },
    { id: 's102', name: 'Jane Smith', standing: 'Probation', semester: 3, overallAvg: 58, gpa: 2.1 },
    { id: 's103', name: 'Peter Jones', standing: 'Warning', semester: 4, overallAvg: 72, gpa: 2.8 },
    { id: 's104', name: 'Emily White', standing: 'Good', semester: 4, overallAvg: 95, gpa: 4.0 },
    { id: 's105', name: 'Chris Green', standing: 'Good', semester: 5, overallAvg: 91, gpa: 3.8 },
    { id: 's106', name: 'John Doe1', standing: 'Good', semester: 3, overallAvg: 88, gpa: 3.5 },
    { id: 's107', name: 'Jane Smith1', standing: 'Probation', semester: 3, overallAvg: 58, gpa: 2.1 },
    { id: 's108', name: 'Peter Jones1', standing: 'Warning', semester: 4, overallAvg: 72, gpa: 2.8 },
    { id: 's109', name: 'Emily White1', standing: 'Good', semester: 4, overallAvg: 95, gpa: 4.0 },
    { id: 's110', name: 'Chris Green1', standing: 'Good', semester: 5, overallAvg: 91, gpa: 3.8 },
    { id: 's111', name: 'John Doe2', standing: 'Good', semester: 3, overallAvg: 88, gpa: 3.5 },
    { id: 's112', name: 'Jane Smith2', standing: 'Probation', semester: 3, overallAvg: 58, gpa: 2.1 },
    { id: 's113', name: 'Peter Jones2', standing: 'Warning', semester: 4, overallAvg: 72, gpa: 2.8 },
    { id: 's114', name: 'Emily White2', standing: 'Good', semester: 4, overallAvg: 95, gpa: 4.0 },
    { id: 's115', name: 'Chris Green2', standing: 'Good', semester: 5, overallAvg: 91, gpa: 3.8 },
    { id: 's116', name: 'John Doe3', standing: 'Good', semester: 3, overallAvg: 88, gpa: 3.5 },
    { id: 's117', name: 'Jane Smith3', standing: 'Probation', semester: 3, overallAvg: 58, gpa: 2.1 },
    { id: 's118', name: 'Peter Jones3', standing: 'Warning', semester: 4, overallAvg: 72, gpa: 2.8 },
    { id: 's119', name: 'Emily White3', standing: 'Good', semester: 4, overallAvg: 95, gpa: 4.0 },
    { id: 's120', name: 'Chris Green3', standing: 'Good', semester: 5, overallAvg: 91, gpa: 3.8 },
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

    useEffect(() => {
        setTimeout(() => {
            setStudents(initialStudents);
            setIsLoading(false);
        }, 500);
    }, []);

    const handleEditClick = (studentId) => {
        console.log(`Open edit modal for student: ${studentId}`);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(students.length / itemsPerPage);

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
                    <option value="">Select Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Avg.</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentStudents.map((student, index) => (
                                <tr key={`${student.id}-${index}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap"><StudentInfoCell name={student.name} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><StatusPill standing={student.standing} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.semester}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.overallAvg}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gpa.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleEditClick(student.id)} className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150 cursor-pointer">Edit Marks</button>
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