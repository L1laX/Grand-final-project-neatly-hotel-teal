"use client";
import React from "react";
import Sidebar from "../Sidebar/page";
import NavBarAdmin3 from "@/components/navbar_admin3/navbar3";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const HotelInfo = () => {
  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar />
      <div className="flex-col">
        <NavBarAdmin3 />

        <div className=" flex w-[1200px] ">This is Hotel Information page</div>
        <Card className=" h-[550px] w-[1080px] " variant="outlined">
          {"Content"}
        </Card>
      </div>
    </div>
  );
};

export default HotelInfo;
