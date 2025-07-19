import React, { useState, useEffect } from 'react';

export const EditStudentModal = ({ student, onClose, onSave }) => {
    if (!student) return null;
    
    const [formData, setFormData] = useState({
        ...student
    });

    useEffect(() => {
        setFormData({ ...student });
    }, [student]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = ['semester', 'overallAvg', 'gpa'].includes(name) ? Number(value) : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose} 
        >
            {/* The Modal Content */}
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Marks for {student.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">×</button>
                </div>

                <form onSubmit={handleSaveClick}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="overallAvg" className="block text-sm font-medium text-gray-700 mb-1">
                                Overall Average (%)
                            </label>
                            <input
                                type="number"
                                name="overallAvg"
                                id="overallAvg"
                                value={formData.overallAvg}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
                                GPA
                            </label>
                            <input
                                type="number"
                                name="gpa"
                                id="gpa"
                                step="0.01"
                                value={formData.gpa}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="standing" className="block text-sm font-medium text-gray-700 mb-1">
                                Academic Standing
                            </label>
                            <select
                                name="standing"
                                id="standing"
                                value={formData.standing}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option>Good</option>
                                <option>Warning</option>
                                <option>Probation</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end items-center border-t pt-4 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-3">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};