// ExamScheduleTable.jsx
import { FileText } from "lucide-react";
import { getStudentMarks } from "../../../utils/api/UsersMarksApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../../utils/AuthContext";
import { generateMarksheetPDF } from "../../../utils/pdf/PdfGenerator";

export const ResultsPage = () => {
  const [testexamData, setExamData] = useState({});
  const { user } = useAuth();
  const username = user.username;
  const [program, setProgram] = useState();

  const formatYearPart = (semester) => {
    const yearPartMap = {
      1: "1/1",
      2: "1/2",
      3: "2/1",
      4: "2/2",
      5: "3/1",
      6: "3/2",
      7: "4/1",
      8: "4/2",
    };
    return yearPartMap[semester] || "Unknown";
  };

  const formatProgram = () => {
    const programMap = {
      BEI: "Electronics, Communication and Information Engineering",
      BME: "Mechanical Engineering",
      BCE: "Civil Engineering",
      BCT: "Computer Engineering",
      BEE: "Electrical Engineering",
      BAR: "Architecture Engineering",
      BAM: "Automobile Engineering",
    };
    setProgram(programMap[user.program] || "Unknown Program");
  };

  useEffect(() => {
    formatProgram();
  }, [user.program]);

  useEffect(() => {
    const getUserMarks = async () => {
      const userMarks = await getStudentMarks(username);
      setExamData(userMarks);
      console.log("User Marks:", userMarks);
    };
    getUserMarks();
  }, []);

  const checkPassed = (semesterData) => {
    return semesterData.every((subject) => subject.marks >= 8);
  };

  return (
    <div className="p-6 bg-white text-[#888888]">
      <h2 className="text-2xl font-semibold text-black text-center mb-4">
        Assessment Results
      </h2>
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 border">SN</th>
              <th className="p-3 border">Level</th>
              <th className="p-3 border">Program</th>
              <th className="p-3 border">Year/part</th>
              <th className="p-3 border">Remarks</th>
              <th className="p-3 border">Marksheet</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(testexamData).map((semesterKey, index) => {
              const semester = parseInt(semesterKey);

              let remarks = checkPassed(testexamData[semesterKey]);

              return (
                <tr key={semester} className="border-b">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">Bachelor</td>
                  <td className="p-3 border">{program}</td>
                  <td className="p-3 border">{formatYearPart(semester)}</td>
                  <td
                    className={`p-3 ${
                      remarks ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {remarks ? "Passed" : "Failed"}
                  </td>
                  <td className="p-3 border">
                    <button
                      className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => {
                        generateMarksheetPDF(
                          user.username,
                          program,
                          semester,
                          testexamData[semesterKey],
                          user.name
                        );
                      }}
                    >
                      <FileText size={16} />
                      Download Marksheet
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
