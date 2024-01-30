"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import Image from "next/legacy/image";
import bg from "/src/asset/background/login-page/bg.png";
const Login = () => {
  return (
    <div className="main-content flex">
      <div className="d">
        <Image src={bg} width={708} height={805} />
      </div>
      <div className="login-form flex w-full flex-col items-center justify-center gap-10">
        <h1>Log In</h1>
        <form action="" className="flex w-80 flex-col">
          <div className="input-content flex flex-col gap-3">
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              className="rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
              type="text"
              name="usernameOrEmail"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              className="rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <PrimaryBtn
              btnName="Log In"
              className="w-full"
              handleClick={() => {
                alert("จ๊ะเอ๋ตัวเอง");
              }}
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
