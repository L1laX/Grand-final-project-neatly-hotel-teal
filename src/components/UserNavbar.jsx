"use client";

import Frame from "@/asset/icons/Frame.svg";
import Image from "next/image";
import Logo from "@/asset/logo/logo-dark.svg";
import Link from "next/link";
import PrimaryBtn from "./common/PrimaryBtn";
import AvatarDropdown from "./common/AvatarDropdown";
import { useSession, signIn } from "next-auth/react";
const UserNavbar = ({ aboutid, serviceid, roomsid }) => {
  const scrollToSection = (elementRef) => {
    console.log(elementRef);
    window.scrollTo({
      behavior: "smooth",
    });
  };

  const { data: session } = useSession();
  return (
    <section className="flex h-[100px] w-screen items-center justify-between bg-white">
      <div className="web-menu flex items-center">
        <div className="logo m-4 ml-24 flex h-[25px] w-[140px] items-center">
          <Link href={"/"} className="hover:opacity-90">
            <Image src={Logo}></Image>
          </Link>
        </div>
        <div className="menu ml-5 hidden gap-5 md:flex">
          <a
            href={aboutid || "/"}
            className="cursor-pointer hover:opacity-75"
            onClick={() => {
              scrollToSection(aboutid);
            }}
          >
            About Nearly
          </a>
          <a
            href={serviceid || "/"}
            className="cursor-pointer hover:opacity-75"
            onClick={() => {
              scrollToSection(serviceid);
            }}
          >
            Service & Facilities
          </a>
          <a
            href={roomsid || "/"}
            className="cursor-pointer hover:opacity-75"
            onClick={() => {
              scrollToSection(roomsid);
            }}
          >
            Rooms & Suits
          </a>
        </div>
      </div>

      <div className="user-menu mx-48">
        <div className="none-user flex items-center justify-items-end gap-5 justify-self-end ">
          {session ? (
            <div className="dropdown relative flex w-[7rem] items-center gap-10">
              <div className="h-15 w-15 cursor-pointer ">
                <Image
                  src={Frame}
                  className=" h-5 w-5 cursor-pointer opacity-50 hover:animate-bounce"
                />
              </div>

              <AvatarDropdown
                image={session?.user.image}
                name={session?.user.username}
              />
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <button
                className="visitlink visitlink:hover visitlink:disabled"
                onClick={() => signIn()}
              >
                Login
              </button>
              <Link href={"/booking"}>
                <PrimaryBtn btnName="BookNow" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserNavbar;
