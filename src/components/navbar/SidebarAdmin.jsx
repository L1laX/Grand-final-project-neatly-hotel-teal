"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/asset/logo/logo-light.svg";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

const Sidebar = ({ setActive }) => {
  const sidebarItem = [
    {
      name: "Customer Booking",
      href: "/admin/",
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
    <>
      <div className="fixed mr-52 flex h-screen w-64 flex-col bg-[#2F3E35] px-4 pb-4 pt-8 text-white">
        <div className="flex h-40 flex-col items-center justify-center px-4 shadow-sm">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              className="inline h-10 cursor-pointer"
            />
          </Link>
          <p className="mt-5 text-sm text-green-500">Admin Panel Control</p>
        </div>

        <div className="flex flex-col gap-4 bg-inherit">
          <ul className="space-y-4">
            {sidebarItem.map((item, index) => (
              <div
                className={`w-full hover:bg-green-600 ${index + 1 === setActive ? "bg-green-600" : ""}`}
                key={index}
              >
                <li>
                  <a
                    href={item.href}
                    className="flex items-center gap-4 rounded-md px-4 py-2 hover:text-white"
                  >
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      {/* Icon for the menu item */}
                    </svg>
                    <span className="text-sm">{item.name}</span>
                  </a>
                </li>
              </div>
            ))}
          </ul>
          <hr />
          <div className="flex w-full justify-center gap-4 whitespace-nowrap p-6 text-base font-medium leading-6 tracking-tight text-gray-300 hover:bg-green-600">
            <div className="flex items-center">
              <CheckboxIcon
                className="h-4 w-4 text-gray-400"
                fill="currentColor"
                aria-hidden="true"
              />
              <div
                className="cursor-pointer pr-[45px]"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-width w-[17rem]"></div>
    </>
  );
};

export default Sidebar;
