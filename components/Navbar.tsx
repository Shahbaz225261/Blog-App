import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-4 flex items-center justify-between shadow-md">
      <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:text-fuchsia-200 transition">
        BlogSphere
      </Link>

      <div className="flex space-x-6">
        <Link href="/blogs" className="text-white font-medium hover:text-fuchsia-100 transition">
          Blogs
        </Link>
      </div>
      <button
        onClick={() => signOut({callbackUrl: "/"})}
        className="ml-6 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 text-white font-semibold shadow transition duration-150"
      >
        Logout
      </button>
    </nav>
  );
}
