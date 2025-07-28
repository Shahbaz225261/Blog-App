import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const session = await getServerSession();
    if (session) {
      redirect("/blogs");
    }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <section className="w-full md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-fuchsia-100 px-10 py-16 border-r border-gray-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Welcome to <span className="text-fuchsia-600">BlogSphere</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover thought-provoking stories, share your knowledge, and connect with like-minded writers across the world.
            BlogSphere is your creative space to write, inspire, and grow a voice that matters.
          </p>
          <ul className="list-disc list-inside text-gray-700 text-base space-y-2 mb-8">
            <li>Create and manage your own blog</li>
            <li>Follow your favorite writers</li>
            <li>Engage in meaningful discussions</li>
            <li>Write once, reach the world</li>
          </ul>
          <div className="flex space-x-4">
            <Link
              href="/signin"
              className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md transition duration-300 ease-in-out hover:brightness-150 hover:scale-105"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-semibold shadow-md transition duration-300 ease-in-out hover:brightness-150 hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full md:w-1/2 relative flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/hero-abstract.png')] bg-cover bg-center" />
        
        <div className="relative z-10 text-center px-6">
          <Image
            src="/generated-image (1).png" 
            alt="Creative blogging illustration"
            width={384} 
            height={384}
            className="mx-auto mb-6 rounded-xl shadow-xl border-4 border-white/60"
          />
          <h2 className="text-white text-3xl font-extrabold mb-2">
            Share Your Story
          </h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Your voice deserves to be heard. Start writing your first blog post today — and build a following that grows with you.
          </p>
        </div>
      </section>
    </div>
  );
}
