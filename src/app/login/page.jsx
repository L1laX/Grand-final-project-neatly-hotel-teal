"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import Image from "next/legacy/image";
import bg from "/src/asset/background/login-page/bg.png";
import { useState } from "react";
const Login = () => {
  const [data, setData] = useState({});
  const handleClick = (e) => {
    e.preventDefault();
    alert(JSON.stringify(data));
    setData({});
  };
  return (
    <div className="main-content flex">
      <div className="image w-[100rem]">
        <Image src={bg} />
      </div>
      <div className="login-form ml-30 mt-48 flex w-full flex-col gap-10">
        <h1>Log In</h1>
        <form action="" className="flex w-1/2 flex-col">
          <div className="input-content flex flex-col gap-3">
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              className="rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
              type="text"
              name="usernameOrEmail"
              placeholder="Enter your username or email"
              value={data.usernameOrEmail || ""}
              onChange={(e) =>
                setData({ ...data, usernameOrEmail: e.target.value })
              }
              required
            />
            <label htmlFor="password">Password</label>
            <input
              className="rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password || ""}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <PrimaryBtn
              btnName="Log In"
              className="w-full"
              handleClick={handleClick}
            />
          </div>
        </form>
        <div className="to-register">
          {" "}
          Don't have an account?{" "}
          <Link
            href={"/register"}
            className="visitlink visitlink:hover visitlink:disabled"
          >
            {" "}
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
