// ExamScheduleTable.jsx
import { FileText } from 'lucide-react';

const examData = [
  {
    sn: 1,
    level: 'Bachelor',
    program: 'Electronics, Communication and Information Engineering',
    yearPart: '2 / 1',
    examSchedule: 'BE 2-1 (208201)',
    remarks: 'Passed',
  },
  {
    sn: 2,
    level: 'Bachelor',
    program: 'Electronics, Communication and Information Engineering',
    yearPart: '1 / 1',
    examSchedule: 'BE 1-1 (208201)',
    remarks: 'Passed',
  },
  {
    sn: 3,
    level: 'Bachelor',
    program: 'Electronics, Communication and Information Engineering',
    yearPart: '2 / 2',
    examSchedule: 'BE 2-2 (208112)',
    remarks: 'Passed',
  },
  {
    sn: 4,
    level: 'Bachelor',
    program: 'Electronics, Communication and Information Engineering',
    yearPart: '1 / 2',
    examSchedule: 'BE 1-2 (208106)',
    remarks: 'Passed',
  },
  {
    sn: 5,
    level: 'Bachelor',
    program: 'Electronics, Communication and Information Engineering',
    yearPart: '2 / 1',
    examSchedule: 'BE 2-1 (208105)',
    remarks: 'Failed',
  },
];

export const ResultsPage=()=> {
  return (
    <div className="p-6 bg-white text-[#888888]">
      <h2 className="text-2xl font-semibold text-black text-center mb-4">Assesments Results</h2>
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 border">SN</th>
              <th className="p-3 border">Level</th>
              <th className="p-3 border">Program</th>
              <th className="p-3 border">Year/part</th>
              <th className="p-3 border">Exam Schedule</th>
              <th className="p-3 border">Remarks</th>
              <th className="p-3 border">Marksheet</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((row) => (
              <tr key={row.sn} className="border-b">
                <td className="p-3 border">{row.sn}</td>
                <td className="p-3 border">{row.level}</td>
                <td className="p-3 border">{row.program}</td>
                <td className="p-3 border">{row.yearPart}</td>
                <td className="p-3 border">{row.examSchedule}</td>
                <td className={row.remarks==='Passed'? `p-3 text-green-500`: `p-3 text-red-500` }>{row.remarks}</td>
                <td className="p-3 border">
                  <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm">
                    <FileText size={16} />
                    Download Marksheet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
