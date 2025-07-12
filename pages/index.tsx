// pages/index.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00 AM`);

interface ScheduleSlot {
  subject: string;
  teacher: string;
  color: string;
}

interface Teacher {
  name: string;
  email: string;
  phone: string;
  role: string;
  birthDate: string;
  qualifications?: { name: string; rate: string }[];
}

type WeekSchedule = {
  [day: string]: {
    [time: string]: ScheduleSlot | null;
  };
};

export default function HomePage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [schedule, setSchedule] = useState<WeekSchedule | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTeachers = localStorage.getItem("allTeachers");
    if (storedTeachers) {
      try {
        setTeachers(JSON.parse(storedTeachers));
      } catch (err) {
        console.error("Failed to parse teachers", err);
      }
    }

    const storedSchedule = localStorage.getItem("teacherSchedule");
    if (storedSchedule) {
      try {
        setSchedule(JSON.parse(storedSchedule));
      } catch (err) {
        console.error("Failed to parse schedule", err);
      }
    }
  }, [router.asPath]);

  const handleDeleteTeacher = (index: number) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      const updated = [...teachers];
      updated.splice(index, 1);
      setTeachers(updated);
      localStorage.setItem("allTeachers", JSON.stringify(updated));
    }
  };

  const handleEditTeacher = (index: number) => {
    localStorage.setItem("editTeacherIndex", index.toString());
    window.location.href = "/edit-teacher";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📚 Teacher Dashboard</h1>

      {/* ✅ Registered Teachers Section */}
      {teachers.length > 0 ? (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">👩‍🏫 Registered Teachers</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-lg font-bold text-blue-700">{teacher.name}</h3>
                <p className="text-sm text-gray-700">📧 {teacher.email}</p>
                <p className="text-sm text-gray-700">📞 {teacher.phone}</p>
                <p className="text-sm text-gray-700">🎓 {teacher.role}</p>
                <p className="text-sm text-gray-700">🎂 DOB: {teacher.birthDate}</p>

                {(teacher.qualifications?.length ??0)> 0 && (
                  <div className="mt-2">
                    <p className="font-semibold text-sm mb-1">🏅 Qualifications:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {teacher.qualifications?.map((q, i) => (
                        <li key={i}>
                          {q.name} ({q.rate})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleEditTeacher(idx)}
                    className="text-blue-600 text-xs hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(idx)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-6 italic">No teachers registered yet.</p>
      )}

      
         <h1 className="text-2xl font-semibold mb-6">Welcome, Admin</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Qualifications Offers</h2>
        <ul className="space-y-2">
          <li className="flex justify-between"><span>BASIC</span><span>$50.00/hr</span></li>
          <li className="flex justify-between"><span>PRO</span><span>$60.00/hr</span></li>
          <li className="flex justify-between"><span>PREMIUM</span><span>$70.00/hr</span></li>
        </ul>
      </div>

      {/* ✅ Schedule Table */}
      {schedule ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold px-4 pt-6 pb-2">📅 Weekly Schedule</h2>
          <table className="min-w-full table-auto text-sm border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-r">Time</th>
                {days.map((day) => (
                  <th key={day} className="px-4 py-2 border-r">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time} className="border-t">
                  <td className="px-4 py-3 font-medium border-r">{time}</td>
                  {days.map((day) => {
                    const slot = schedule[day]?.[time];
                    return (
                      <td key={`${day}-${time}`} className="px-2 py-3 border-r h-20">
                        {slot ? (
                          <div className={`p-2 rounded ${slot.color}`}>
                            <div className="font-bold text-sm">{slot.subject}</div>
                            <div className="text-xs">{slot.teacher}</div>
                          </div>
                        ) : (
                          <span className="text-gray-300 text-xs italic">No Class</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">Loading schedule...</p>
      )}
    </div>
  );
}
