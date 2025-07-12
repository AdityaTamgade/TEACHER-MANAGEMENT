// pages/students.tsx

import { Student } from "../types"; // ✅ Reuse Student type

// Static student data (can be replaced with API data later)
const students: Student[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    class: "10A",
    performance: 92,
  },
  {
    id: 2,
    name: "Simran Kaur",
    email: "simran.kaur@example.com",
    class: "10B",
    performance: 88,
  },
  {
    id: 3,
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    class: "9C",
    performance: 79,
  },
];

export default function StudentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Student List</h1>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Performance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">{student.class}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.performance >= 85
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {student.performance}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
