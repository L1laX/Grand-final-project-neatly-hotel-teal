"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/asset/logo/logo-light.svg";
import { Checkbox } from "@mui/material";
import { CheckboxIcon } from "@radix-ui/react-icons";

const Sidebar = () => {
  const sidebarItem = [
    {
      name: "Customer Booking",
      href: "/admin/booking",
      svg: "",
    },
    {
      name: "Room Management",
      href: "/admin/room_management",
      svg: "",
    },
    {
      name: "Hotel Information",
      href: "/admin/hotel_info",
      svg: "",
    },
    {
      name: "Room & Property",
      href: "/admin/room_type",
      svg: "",
    },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-[#2F3E35] px-4 pb-4 pt-8 text-white ">
      <div className="flex h-40 flex-col items-center justify-center px-4 shadow-sm ">
        <Image src={Logo} className="inline h-10 cursor-pointer" />

        <p className="mt-5 text-sm text-green-500">Admin Panel Control</p>
      </div>

      <div className=" flex flex-col gap-4  bg-inherit">
        <ul className="space-y-4 ">
          {sidebarItem.map((item, index) => (
            <div
              className="flex w-full gap-4 whitespace-nowrap  p-6 text-base font-medium leading-6 tracking-tight  text-gray-300 hover:bg-green-600"
              key={index}
            >
              <li>
                <a
                  href={item.href}
                  className="flex items-center gap-4 rounded-md  px-4 py-2 text-gray-200 duration-500 hover:text-white"
                >
                  <CheckboxIcon
                    className="h-4 w-4 text-gray-400 "
                    src={item.svg}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  <span className=" text-sm">{item.name}</span>
                </a>
              </li>
            </div>
          ))}
        </ul>
        <hr />
        <div className="flex w-full justify-center gap-4  whitespace-nowrap p-6 text-base font-medium leading-6 tracking-tight text-gray-300 hover:bg-green-600">
          <div className=" flex items-center ">
            <CheckboxIcon
              className="h-4 w-4 text-gray-400 "
              fill="currentColor"
              aria-hidden="true"
            />
            <div className="pr-[45px]">
              <Link
                href="/admin/login"
                className="flex items-center gap-4 rounded-md  px-4 text-gray-200 duration-500 hover:text-white"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
