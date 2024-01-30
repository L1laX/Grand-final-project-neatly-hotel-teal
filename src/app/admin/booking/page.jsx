"use client";
import React from "react";
import Sidebar from "../Sidebar/page.jsx";
import NavBar from "/src/components/navBar/navbar.jsx";

function CustomerBooking() {
  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar />
      <div className="flex flex-col ">
        <NavBar />
        <h1>This Customer Booking page</h1>
      </div>
    </div>
  );
}

export default CustomerBooking;
