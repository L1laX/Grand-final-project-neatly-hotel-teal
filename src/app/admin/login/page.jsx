import React from "react";
import Link from "next/link";

const adminLogin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="mb-2 block text-gray-600">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-2 block text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account yet?{" "}
          <Link href="/admin/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default adminLogin;
