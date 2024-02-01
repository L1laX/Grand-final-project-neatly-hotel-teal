import React from "react";
import PrimaryBtn from "../common/PrimaryBtn";

const NavBarAdmin3 = () => {
  return (
    <nav
      className="border- #E4E6ED  w-[1350px]
bg-white p-4"
    >
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-black">Hotel Information</div>

        <div className="flex items-center">
          {/* Search Input */}
          <div className="mr-4">
            <PrimaryBtn
              type="text"
              btnName={"Update"}
              className="
                rounded-md border
                border-gray-300 px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarAdmin3;
