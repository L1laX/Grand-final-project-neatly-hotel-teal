"use client";

import React from "react";
import Sidebar from "./Sidebar/page";
const Admin = () => {
  return (
    <div>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full items-center justify-center">
          Hello Admin
        </div>
      </div>
    </div>
  );
};

export default Admin;
