// // components/Sidebar.tsx
// import Link from 'next/link';

// export default function Sidebar() {
//   return (
//     <aside className="w-64 min-h-screen bg-[#111827] text-white p-4 space-y-6">
//       <div className="text-xl font-bold mb-4">📚 Teacher Management</div>
//       <nav className="space-y-3">
//         <Link href="/" className="block hover:text-blue-400">🏠 Home</Link>
//         <Link href="/add-teacher" className="block hover:text-blue-400">➕ ADD TEACHER</Link>
//         <Link href="/students" className="block hover:text-blue-400">👨‍🎓 STUDENTS</Link>
//         <Link href="/schedule" className="block hover:text-blue-400">🗓️ SCHEDULE</Link>
//         <Link href="/setting" className="block hover:text-blue-400">⚙️ SETTING</Link>
//       </nav>
//     </aside>
//   );
// }



























import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#111827] text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#111827] text-white p-4 space-y-6 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}
      >
        <div className="text-xl font-bold mb-4">📚 Teacher Management</div>
        <nav className="space-y-3">
          <Link href="/" className="block hover:text-blue-400">🏠 Home</Link>
          <Link href="/add-teacher" className="block hover:text-blue-400">➕ ADD TEACHER</Link>
          <Link href="/students" className="block hover:text-blue-400">👨‍🎓 STUDENTS</Link>
          <Link href="/schedule" className="block hover:text-blue-400">🗓️ SCHEDULE</Link>
          <Link href="/setting" className="block hover:text-blue-400">⚙️ SETTING</Link>
        </nav>
      </aside>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
