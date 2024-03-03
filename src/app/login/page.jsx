"use client";
import { signIn } from "next-auth/react";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import Image from "next/legacy/image";
import bg from "/src/asset/background/login-page/bg.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SecondaryBtn from "@/components/common/SecondaryBtn";
import { usePathname } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();
  const { asPath, pathname } = usePathname();
  let urlCallBack = null;
  if (window) {
    urlCallBack = `https://${window.location.hostname}/admin`;
  }
  console.log(urlCallBack, "urlCallBack");
  //get session data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: e.target[0].value, password: e.target[1].value };
    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      if (result.status === 200) {
        setIsValid(true);
        router.push("/admin");
      }
      if (result.status === 401) {
        setIsValid(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="main-content relative flex">
      <div className="image absolute -z-10 md:static md:block md:w-[100rem]">
        <Image src={bg} alt="background-image" />
      </div>
      <div className="login-form  m-7 flex w-full flex-col items-center gap-10 rounded-xl bg-[#f7f7fb] md:ml-24 md:mt-32 md:items-start ">
        <h1 className="mt-5 text-5xl md:text-[68px]">Log In</h1>
        <form onSubmit={handleSubmit} className="flex w-1/2 flex-col">
          <div className="input-content flex flex-col gap-3 ">
            <div className="input-content username-password-section relative flex  flex-col gap-3">
              <label htmlFor="username">username or email</label>
              <input
                className="rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username or email"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">password</label>
              <input
                className="mb-8 rounded-md border p-1 focus:outline-1 focus:outline-orange-400 focus:ring-1 focus:ring-inset focus:ring-orange-400"
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isValid === false && (
                <div className="absolute bottom-0 text-red-600">
                  Please check your usename or password
                </div>
              )}
            </div>

            <PrimaryBtn
              btnName="Log In"
              className="w-full"
              onClick={handleSubmit}
            />
          </div>
          <div className="to-register mt-5 text-center md:text-start">
            Don't have an account ?
            <Link
              href={"/register"}
              className="visitlink visitlink:hover visitlink:disabled ml-3"
            >
              Register
            </Link>
          </div>
        </form>
        <div className="mt-1 w-1/2">
          <SecondaryBtn
            secondaryButton="w-full"
            google={true}
            handleClick={() => {
              signIn("google", {
                callbackUrl: urlCallBack,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
