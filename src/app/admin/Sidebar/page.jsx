"use client";

import React from "react";
import Link from "next/link";

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
    <div className="bg-light border-2F3E35 flex h-[1024px] w-[240px]   flex-col  bg-[#2F3E35] p-24 px-4 pb-4 pt-8 text-white">
      <div className="p-[40px 24px 40px 24px] h-[152.34px] w-full gap-16 text-center">
        {/* header navbar */}
        <h1>Nealty</h1>
        <p className="text-[16px] text-sm text-green-400">
          Admin Panel Control
        </p>
      </div>

      <div className="h-[540px] w-[240px]">
        <ul className="flex flex-col gap-16">
          {sidebarItem.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex flex-row items-center gap-16 text-sm"
              >
                <div className=" text-[#D5DFDA]">
                  <p>{item.name}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <hr />
        <Link href="/admin/login">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
