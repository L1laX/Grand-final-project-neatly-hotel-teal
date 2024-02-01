import React from "react";
import Link from "next/link";
import PrimaryBtn from "@/components/common/PrimaryBtn";

const adminLogin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold">Login</h1>
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

          <PrimaryBtn btnName={"Login"} />
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
