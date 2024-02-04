"use client";
import { signIn } from "next-auth/react";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import Image from "next/legacy/image";
import bg from "/src/asset/background/login-page/bg.png";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  //get session data
  const { data: session } = useSession();
  console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username: e.target[0].value, password: e.target[1].value };
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className="main-content relative flex">
      <div className="image absolute -z-10 md:static md:block md:w-[100rem]">
        <Image src={bg} />
      </div>
      <div className="login-form  m-7 flex w-full flex-col items-center gap-10 rounded-xl bg-[#f7f7fb] md:ml-24 md:mt-32 md:items-start">
        <h1 className="mt-5 text-5xl md:text-[68px]">Log In</h1>
        <form onSubmit={handleSubmit} className="flex w-1/2 flex-col">
          <div className="input-content flex flex-col gap-3">
            <label htmlFor="username">Username or Email</label>
            <input
              className="rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username or email"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              className="rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PrimaryBtn
              btnName="Log In"
              className="w-full"
              onClick={handleSubmit}
            />
          </div>
          <div className="to-register mt-5 text-center md:text-start">
            Don't have an account?
            <Link
              href={"/register"}
              className="visitlink visitlink:hover visitlink:disabled"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
