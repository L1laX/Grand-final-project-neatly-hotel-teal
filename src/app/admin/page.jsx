"use client";

import React from "react";
import Sidebar from "./Sidebar/page";
import NavBar from "@/components/navbar/NavbarAdmin";
const Admin = () => {
  return (
    <div>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full flex-col">
          <NavBar />
          <div className="main flex h-full items-center justify-center">
            Hello Admin
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
