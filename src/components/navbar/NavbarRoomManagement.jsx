"use client";

import React, { useState } from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import BackArrow from "/src/asset/icons/BackArrow.svg";
import Image from "next/legacy/image";
import Link from "next/link";

const NavBarAdmin = ({
  navName,
  button,
  buttonName,
  notSearch,
  backarrow,
  setFilteredResults,
}) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch(`/api/admin/room_management?keywords=${value}`)
      .then((response) => response.json())
      .then((json) => {
        const result = json.data.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredResults(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearch = (value) => {
    setInput(value);
    if (value.trim() !== "") {
      fetchData(value);
    } else {
      setFilteredResults([]);
      fetchData("");
    }
  };

  return (
    <nav className="border- #E4E6ED  w-full bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4 text-xl font-bold text-black">
          {backarrow && (
            <Link href={"/admin/room_type"}>
              <Image
                className="cursor-pointer"
                src={BackArrow}
                width={15}
                height={15}
                alt="back arrow"
              />
            </Link>
          )}
          {navName}
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            {!notSearch && (
              <input
                type="text"
                placeholder="Search..."
                value={input}
                onChange={(e) => handleSearch(e.target.value)}
                className={`
                rounded-md border
                border-gray-300 px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                ${button ? "mr-5" : ""}
              `}
              />
            )}
            <span className="button mr-12">
              {button && (
                <PrimaryBtn btnName={buttonName} handleClick={() => {}} />
              )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarAdmin;
