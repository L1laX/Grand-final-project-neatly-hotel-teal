import React from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import BackArrow from "/src/asset/icons/arrow_back.svg";
import Image from "next/legacy/image";
import Link from "next/link";
const NavBar = ({
  navName,
  button,
  buttonName,
  notSearch,
  backarrow,
  handleSubmit,
  linkTo,
  customerName,
  setSearch,
}) => {
  return (
    <nav
      className="border- #E4E6ED w-full bg-white
p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4 text-xl font-bold text-black">
          {backarrow && (
            <Link className="mt-2 hover:opacity-85" href={linkTo}>
              <Image
                className="cursor-pointer "
                src={BackArrow}
                width={30}
                height={30}
                alt="back arrow"
              ></Image>
            </Link>
          )}
          <p>{customerName}</p>
          {navName}
        </div>
        <div className="flex items-center">
          {/* Search Input */}
          <div className="mr-4">
            {!notSearch && (
              <input
                type="text"
                placeholder="Search..."
                className={`
                rounded-md border
                border-gray-300 px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                ${button ? "mr-5" : ""}`}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            {/*Create Room*/}
            <span className="button mr-12">
              {button && (
                <PrimaryBtn btnName={buttonName} handleClick={handleSubmit} />
              )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
