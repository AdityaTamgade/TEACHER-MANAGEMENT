import { useEffect, useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00 AM`);

interface ScheduleSlot {
  subject: string;
  teacher: string;
  color: string;
}

type WeekSchedule = {
  [key: string]: {
    [key: string]: ScheduleSlot | null;
  };
};

const initialSchedule: WeekSchedule = days.reduce((acc, day) => {
  acc[day] = {};
  timeSlots.forEach((slot) => {
    acc[day][slot] = null;
  });
  return acc;
}, {} as WeekSchedule);

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<WeekSchedule>(initialSchedule);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    setHasMounted(true);
    setToday(new Date().toLocaleDateString("en-US", { weekday: "long" }));
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const stored = localStorage.getItem("teacherSchedule");
    if (stored) {
      setSchedule(JSON.parse(stored));
    }
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    localStorage.setItem("teacherSchedule", JSON.stringify(schedule));
  }, [schedule, hasMounted]);

  if (!hasMounted) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Weekly Schedule</h1>
        <button
          className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          onClick={() => {
            if (confirm("Are you sure you want to reset the entire schedule?")) {
              setSchedule(initialSchedule);
              localStorage.removeItem("teacherSchedule");
            }
          }}
        >
          Reset All
        </button>
      </div>

      {selectedSlot && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-[350px]">
            <h2 className="text-lg font-bold mb-4">Assign Subject</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
                const teacher = (form.elements.namedItem("teacher") as HTMLInputElement).value;

                const colors = [
                  "bg-blue-100 text-blue-800",
                  "bg-green-100 text-green-800",
                  "bg-yellow-100 text-yellow-800",
                  "bg-purple-100 text-purple-800",
                  "bg-pink-100 text-pink-800",
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];

                setSchedule((prev) => ({
                  ...prev,
                  [selectedSlot.day]: {
                    ...prev[selectedSlot.day],
                    [selectedSlot.time]: { subject, teacher, color },
                  },
                }));

                setSelectedSlot(null);
              }}
            >
              <input
                name="subject"
                placeholder="Subject"
                required
                className="w-full border px-3 py-2 mb-3 rounded"
              />
              <input
                name="teacher"
                placeholder="Teacher"
                required
                className="w-full border px-3 py-2 mb-4 rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="px-4 py-2 rounded bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left border-r">Time</th>
              {days.map((day) => (
                <th key={day} className="px-4 py-3 text-left border-r">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="border-t">
                <td className="px-4 py-3 font-medium border-r">{time}</td>
                {days.map((day) => {
                  const cell = schedule[day][time];
                  const isToday = today === day;

                  return (
                    <td
                      key={`${day}-${time}`}
                      className={`px-2 py-3 border-r h-20 cursor-pointer text-sm relative ${
                        isToday ? "bg-blue-50" : "bg-white"
                      } hover:bg-blue-100`}
                      onClick={() => setSelectedSlot({ day, time })}
                    >
                      {cell ? (
                        <div className={`p-2 rounded ${cell.color} relative`}>
                          <div className="font-bold">{cell.subject}</div>
                          <div className="text-xs">{cell.teacher}</div>
                          <button
                            className="absolute top-1 right-1 text-red-500 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSchedule((prev) => ({
                                ...prev,
                                [day]: {
                                  ...prev[day],
                                  [time]: null,
                                },
                              }));
                            }}
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">Assign</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
