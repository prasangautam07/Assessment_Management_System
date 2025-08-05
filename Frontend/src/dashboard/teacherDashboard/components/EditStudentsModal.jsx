import React, { useState, useEffect } from "react";
import { SEMESTER_SUBJECTS } from "@utils/Subjects";

export const EditStudentsModal = ({ student, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    ...student,
    marks: student.marks || {},
    semester: student.semester,
  });
  const [selectedSemester, setSelectedSemester] = useState(
    student.semester || 1
  );
  const [errorMsg, setErrorMsg] = useState("");

  const program = student.program || "BEI";
  const subjectsForSelectedSemester =
    SEMESTER_SUBJECTS[program] && SEMESTER_SUBJECTS[program][selectedSemester]
      ? SEMESTER_SUBJECTS[program][selectedSemester]
      : [];

  useEffect(() => {
    setFormData({
      ...student,
      marks: student.marks || {},
    });
    setSelectedSemester(student.semester || 1);
  }, [student]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      semester: selectedSemester,
    }));
  }, [selectedSemester]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMarkChange = (e) => {
    const { value } = e.target;
    const subjectName = e.target.dataset.subject;

    setFormData((prev) => ({
      ...prev,
      marks: {
        ...prev.marks,
        [subjectName]: value === "" ? "" : Number(value),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasAnyMark = subjectsForSelectedSemester.some(
      (subject) =>
        formData.marks[subject] !== "" &&
        formData.marks[subject] !== undefined &&
        formData.marks[subject] !== null
    );
    if (!hasAnyMark) {
      setErrorMsg("Please enter marks for at least one subject before submitting.");
      return;
    }
    setErrorMsg("");
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faculty
              </label>
              <input
                type="text"
                name="name"
                value={formData.program}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <hr className="my-6" />
          <div>
            <div className="mb-6">
              <label
                htmlFor="semester-select"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Select Semester
              </label>
              <select
                id="semester-select"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(Number(e.target.value))}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
              >
                {Object.keys(SEMESTER_SUBJECTS[student.program] || {}).map(
                  (sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  )
                )}
              </select>
            </div>

            <h3 className="text-md font-semibold text-gray-600 mb-4 border-t pt-4">
              Enter Marks for Semester {selectedSemester}
            </h3>

            {subjectsForSelectedSemester.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
                {subjectsForSelectedSemester.map((subject) => (
                  <div key={subject}>
                    <label
                      htmlFor={subject}
                      className=" text-sm font-medium text-gray-600 flex items-start"
                    >
                      {subject}
                    </label>
                    <input
                      type="number"
                      id={subject}
                      data-subject={subject}
                      value={formData.marks[subject] || ""}
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

          {errorMsg && (
            <div className="text-red-600 text-sm mt-4 mb-2 text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-8 pt-6 border-gray-200 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-2 mt-4 cursor-pointer bg-red-700 text-white rounded-md hover:opacity-60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-primary text-white rounded-md p-2 mt-4 cursor-pointer transition-transform duration-600 flex items-center justify-center min-w-[120px] ${
                loading ? "opacity-60" : "hover:opacity-80 hover:scale-[1]"
              }`}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? "Adding Marks.." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
