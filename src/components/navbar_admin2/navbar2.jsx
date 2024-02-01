import React from "react";

const NavBarAdmin2 = () => {
  return (
    <nav
      className="border- #E4E6ED w-[1300px] bg-white
p-4"
    >
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-black">Room Management</div>

        <div className="flex items-center">
          {/* Search Input */}
          <div className="mr-4">
            <input
              type="text"
              placeholder="Search..."
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

export default NavBarAdmin2;
