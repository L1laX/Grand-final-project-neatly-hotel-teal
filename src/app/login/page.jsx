"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import Image from "next/legacy/image";
import bg from "/src/asset/background/login-page/bg.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    alert("hello");
    setData({});
    router.push("/");
  };
  return (
    <div className="main-content relative flex">
      <div className="image absolute -z-10 md:static md:block md:w-[100rem]">
        <Image src={bg} />
      </div>
      <div className="login-form  m-7 flex w-full flex-col items-center gap-10 rounded-xl bg-[#f7f7fb] md:ml-24 md:mt-32 md:items-start">
        <h1 className="mt-5 text-5xl md:text-[68px]">Log In</h1>
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
          <div className="to-register  mt-5 text-center md:text-start">
            Don't have an account?
            <Link
              href={"/register"}
              className="visitlink visitlink:hover visitlink:disabled"
            >
              {" "}
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
