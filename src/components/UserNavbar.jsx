"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Logo from "@/asset/logo/logo-dark.svg";
import Link from "next/link";
import PrimaryBtn from "./common/PrimaryBtn";
const UserNavbar = ({ about, service, rooms }) => {
  const aboutSection = useRef(about || null);
  const serviceSection = useRef(service || null);
  const roomsSection = useRef(rooms || null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <nav className="flex h-[100px] w-screen items-center justify-between bg-white">
      <div className="web-menu flex items-center">
        <div className="logo m-4 ml-24 flex h-[25px] w-[140px] items-center">
          <Link href={"/"}>
            <Image src={Logo}></Image>
          </Link>
        </div>
        <div className="menu ml-5 hidden gap-5 md:flex">
          <button
            onClick={() => {
              scrollToSection(aboutSection);
            }}
          >
            About Nearly
          </button>
          <button
            onClick={() => {
              scrollToSection(serviceSection);
            }}
          >
            Service & Facilities
          </button>
          <button
            onClick={() => {
              scrollToSection(roomsSection);
            }}
          >
            Rooms & Suits
          </button>
        </div>
      </div>
      <div className="user-menu mx-48">
        <div className="none-user flex items-center justify-items-end gap-5 justify-self-end ">
          <Link
            href={"/login"}
            className="text-orange-500 hover:text-orange-300"
          >
            Login
          </Link>
          <PrimaryBtn btnName="BookNow" />
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
