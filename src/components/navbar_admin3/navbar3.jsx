import React from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import BackArrow from "/src/asset/icons/BackArrow.svg";
import Image from "next/legacy/image";
import Link from "next/link";

const NavBarAdmin3 = ({ navName, buttonName, backarrow, handleUpdate }) => {
  const handleSubmit = () => {
    // Perform any necessary logic before update (e.g., API call)
    handleUpdate();
  };

  return (
    <nav className="border- #E4E6ED w-full bg-white p-4">
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
              ></Image>
            </Link>
          )}
          {navName}
        </div>
        <div className="flex items-center">
          <PrimaryBtn btnName={"Update"} handleClick={handleSubmit} />
        </div>
      </div>
    </nav>
  );
};

export default NavBarAdmin3;
