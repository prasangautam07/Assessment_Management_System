import React, { useState, useEffect } from 'react';

const SEMESTER_SUBJECTS = {
  1: ["Engineering Mathematics I", "Computer Programming", "Engineering Drawing", "Engineering Physics","Digital Logic","Basic Electrical Engineering"],
  2: ["Engineering Mathematics II", "Object Oriented Programming", "Engineering Chemistry", "Electric Circuit and Machine","Microprocessor"],
  3: ["Engineering Mathematics III", "Data Structures and Algorithms", "Electrical Circuits", "Digital Logic"],
  4: ["Professional Communication", "Database Management Systems", "Applied Mechanics", "Numerical Methods","Electrical Circuits", "Digital Logic"],
  // Add more semesters and subjects as needed
};

export const EditStudentsModal = ({ student, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...student,
        marks: student.marks || {},
        semester: student.semester
    });
    const [selectedSemester, setSelectedSemester] = useState(student.semester || 1);

    const subjectsForSelectedSemester = SEMESTER_SUBJECTS[selectedSemester] || [];

    useEffect(() => {
        setFormData({
            ...student,
            marks: student.marks || {},
        });
        setSelectedSemester(student.semester || 1);
    }, [student]);

    useEffect(() => {
        setFormData(prev => ({
        ...prev,
        semester: selectedSemester
        }));
  }, [selectedSemester]);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMarkChange = (e) => {
        const { value } = e.target;
        const subjectName = e.target.dataset.subject;

        setFormData(prev => ({
            ...prev,
            marks: {
                ...prev.marks,
                [subjectName]: value === '' ? '' : Number(value)
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center p-4 mt-13 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl transform transition-all max-h-[90vh] overflow-y-auto">
                <div className="flex justify-center items-center pb-4 border-b border-gray-200 sticky top-0 bg-white">
                    <h2 className="text-2xl font-bold flex text-gray-800">Add Marks</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Standing</label>
                            <select
                                name="standing"
                                value={formData.standing}
                                onChange={handleFieldChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Good">Good</option>
                                <option value="Warning">Warning</option>
                                <option value="Probation">Probation</option>
                            </select>
                        </div>
                    </div>

                    <hr className="my-6" />
                    <div>
                        <div className="mb-6">
                            <label htmlFor="semester-select" className="block text-lg font-semibold text-gray-700 mb-2">
                                Select Semester
                            </label>
                            <select
                                id="semester-select"
                                value={selectedSemester}
                                onChange={(e) => setSelectedSemester(Number(e.target.value))}
                                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                            >
                                {Object.keys(SEMESTER_SUBJECTS).map((sem) => (
                                    <option key={sem} value={sem}>
                                        Semester {sem}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <h3 className="text-md font-semibold text-gray-600 mb-4 border-t pt-4">
                            Enter Marks for Semester {selectedSemester}
                        </h3>

                        {subjectsForSelectedSemester.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
                                {subjectsForSelectedSemester.map((subject) => (
                                    <div key={subject}>
                                        <label htmlFor={subject} className=" text-sm font-medium text-gray-600 flex items-start">
                                            {subject}
                                        </label>
                                        <input
                                            type="number"
                                            id={subject}
                                            data-subject={subject}
                                            value={formData.marks[subject] || ''}
                                            onChange={handleMarkChange}
                                            placeholder="Not graded"
                                            min="0"
                                            max="100"
                                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 bg-gray-50 p-4 rounded-md">
                                No subjects found for this semester.
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
                        <button type="button" onClick={onClose} className="px-5 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit"  className="px-5 py-2 cursor-pointer bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};