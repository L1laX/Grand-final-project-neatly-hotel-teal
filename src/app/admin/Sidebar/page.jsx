"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/asset/logo/logo-light.svg";

const Sidebar = () => {
  const sidebarItem = [
    {
      name: "Customer Booking",
      href: "/admin/booking",
    },
    {
      name: "Room Management",
      href: "/admin/room_management",
    },
    {
      name: "Hotel Information",
      href: "/admin/hotel_info",
    },
    {
      name: "Room & Property",
      href: "/admin/room_type",
    },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-[#2F3E35] px-4 pb-4 pt-8 text-white ">
      <div className="flex h-40 flex-col items-center justify-center px-4 ">
        <Image src={Logo} className="inline h-10 cursor-pointer" />

        <p className="mt-5 text-sm text-green-500">Admin Panel Control</p>
      </div>

      <div className=" flex flex-col gap-4">
        <ul className="space-y-4 ">
          {sidebarItem.map((item, index) => (
            <div className="w-full hover:bg-green-600" key={index}>
              <li>
                <a
                  href={item.href}
                  className="flex items-center gap-4 rounded-md px-4 py-2 text-gray-200 duration-500 hover:text-white"
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
      </div>

      <div className="mt-auto">
        <hr className="my-4" />
        <div className="w-full hover:bg-green-600">
          <Link href="/admin/login" className="px-4 py-2 text-white  ">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
