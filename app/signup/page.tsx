"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Signup() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-fuchsia-100">
      <div className="w-96 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 flex flex-col items-center border border-white/80">
        <h2 className="text-2xl font-normal text-center mb-4 text-gray-900 tracking-normal">
          Create your account
        </h2>
        <p className="mb-4 text-gray-600 text-center text-base">
          Enter your details
        </p>

        <div className="space-y-5 w-full">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              ref={username}
              id="username"
              type="text"
              required
              className="border border-gray-200 rounded-lg w-full py-1.5 px-3 text-gray-800 placeholder:text-gray-400 bg-white/90 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-base"
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              ref={password}
              id="password"
              type="password"
              required
              className="border border-gray-200 rounded-lg w-full py-1.5 px-3 text-gray-800 placeholder:text-gray-400 bg-white/90 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-base"
              placeholder="Enter password"
              autoComplete="new-password"
            />
          </div>
          <button
            onClick={async () => {
              const user = username.current?.value;
              const pass = password.current?.value;
              await axios.post("http://localhost:3000/api/v1/signup", {
                username:user,
                password:pass,
              });
              router.push("/signin"); 
            }}
            className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-md transition duration-300 ease-in-out hover:brightness-110 hover:scale-105"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-fuchsia-600 hover:underline font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
