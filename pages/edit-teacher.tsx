// pages/edit-teacher.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Teacher } from "../types";

export default function EditTeacher() {
  const router = useRouter();
  const [form, setForm] = useState<Teacher | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const idx = localStorage.getItem("editTeacherIndex");
    const all = JSON.parse(localStorage.getItem("allTeachers") || "[]");
    if (idx !== null && all[idx]) {
      setForm(all[idx]);
      setIndex(Number(idx));
    } else {
      alert("Teacher not found");
      router.push("/");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form !== null && index !== null) {
      const all = JSON.parse(localStorage.getItem("allTeachers") || "[]");
      all[index] = form;
      localStorage.setItem("allTeachers", JSON.stringify(all));
      localStorage.removeItem("editTeacherIndex");
      router.push("/");
    }
  };

  if (!form) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="text-blue-600 mb-4 underline"
      >
        ← Back
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Teacher</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="teacher@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+91-1234567890"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="role"
            placeholder="e.g., Subject Expert"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Teacher
          </button>
        </form>
      </div>
    </div>
  );
}
