"use client";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import  Google  from "@/icons/Google";

export default function Signin() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-fuchsia-100">
      <div className="w-96 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 flex flex-col items-center border border-white/80">
        <h2 className="text-2xl font-normal text-center mb-4 text-gray-900 tracking-normal">
          Log in to your account
        </h2>
        <p className="mb-4 text-gray-600 text-center text-base">
          Please enter your details
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5 w-full">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              ref={username}
              id="username"
              type="text"
              required
              className="border border-gray-200 rounded-lg w-full py-1.5 px-3 text-gray-800 placeholder:text-gray-400 bg-white/90 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-base"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              ref={password}
              id="password"
              type="password"
              required
              className="border border-gray-200 rounded-lg w-full py-1.5 px-3 text-gray-800 placeholder:text-gray-400 bg-white/90 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-base"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-600 text-center text-sm font-semibold">
              {error}
            </p>
          )}

          <button
            type="button"
            className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-md transition duration-300 ease-in-out hover:brightness-110 hover:scale-105"
            onClick={async () => {
              setLoader(true);
              setError("");
              const res = await signIn("credentials", {
                redirect: false,
                username: username.current?.value,
                password: password.current?.value,
              });
              if (res?.ok) {
                router.push("/blogs");
              } else {
                setLoader(false);
                setError("Invalid username or password");
              }
            }}
          >
            Sign In
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="w-full mt-6">
  <button
    onClick={() => signIn("google", { callbackUrl: "/blogs" })}
    className="
      w-full
      flex items-center justify-center gap-2
      py-2.5 px-4
      rounded-md
      bg-white
      border border-gray-300
      shadow-sm
      transition
      hover:bg-gray-50
      hover:shadow-md
      focus:outline-none
      focus:ring-2 focus:ring-blue-100
      active:border-gray-400
      group
    "
    style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
  >
    <Google/>
    <span className="text-gray-800 text-[15px] font-medium">
      Sign in with Google
    </span>
  </button>
</div>


        <p className="mt-6 text-gray-500 text-sm">
          New here?{" "}
          <a
            href="/signup"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
