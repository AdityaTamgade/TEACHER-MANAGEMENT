// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#111827] text-white p-4 space-y-6">
      <div className="text-xl font-bold mb-4">📚 Teacher Management</div>
      <nav className="space-y-3">
        <Link href="/" className="block hover:text-blue-400">🏠 Home</Link>
        <Link href="/add-teacher" className="block hover:text-blue-400">➕ ADD TEACHER</Link>
        <Link href="/students" className="block hover:text-blue-400">👨‍🎓 STUDENTS</Link>
        <Link href="/schedule" className="block hover:text-blue-400">🗓️ SCHEDULE</Link>
        <Link href="/setting" className="block hover:text-blue-400">⚙️ SETTING</Link>
      </nav>
    </aside>
  );
}
