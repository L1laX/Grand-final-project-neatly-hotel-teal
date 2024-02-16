import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dropdown = ({ status, row, onStatusUpdate }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedItem, setSelectedItem] = useState(status);
  const [items, setItems] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/room_management");
      const data = response.data;

      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleStatusUpdate = async (itemId) => {
    try {
      await axios.put(`/api/admin/room_management/${row.id}`, {
        id: row.id,
        status: itemId,
      });

      const response = await axios.get("/api/admin/room_management");
      const newData = response.data;

      onStatusUpdate(row.id, itemId);
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setDropdownVisible(false);
  };

  const statusItems = [
    {
      value: "vacant",
      label: "Vacant",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-emerald-800 whitespace-nowrap  bg-slate-100",
    },
    {
      value: "occupied",
      label: "Occupied",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-blue-800 whitespace-nowrap bg-indigo-100 rounded",
    },
    {
      value: "assignClean",
      label: "Assign Clean",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-emerald-800 whitespace-nowrap bg-cyan-50 rounded",
    },
    {
      value: "assignDirty",
      label: "Assign Dirty",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-red-800 whitespace-nowrap bg-rose-100 rounded",
    },
    {
      value: "vacantClean",
      label: "Vacant Clean",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-emerald-800 whitespace-nowrap bg-cyan-50 rounded",
    },
    {
      value: "vacantCleanInspected",
      label: "Vacant Clean Inspected",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-yellow-800 whitespace-nowrap bg-yellow-50 rounded",
    },
    {
      value: "vacantCleanPickUp",
      label: "Vacant Clean Pick Up",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-emerald-800 whitespace-nowrap bg-cyan-50 rounded",
    },
    {
      value: "occupiedClean",
      label: "Occupied Clean",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-blue-800 whitespace-nowrap bg-indigo-100 rounded",
    },
    {
      value: "occupiedCleanInspected",
      label: "Occupied Clean Inspected",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-yellow-800 whitespace-nowrap bg-yellow-50 rounded",
    },
    {
      value: "occupiedDirty",
      label: "Occupied Dirty",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-red-800 whitespace-nowrap bg-rose-100 rounded",
    },
    {
      value: "outOfOrder",
      label: "Out of Order",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-gray-500 whitespace-nowrap rounded bg-slate-100",
    },
    {
      value: "outOfService",
      label: "Out of Service",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-gray-500 whitespace-nowrap rounded bg-slate-100",
    },
    {
      value: "outOfInventory",
      label: "Out of Inventory",
      style:
        "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-gray-500 whitespace-nowrap rounded bg-slate-100",
    },
  ].filter((item) =>
    item.label.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="relative">
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className=""
        type="button"
        onClick={handleToggleDropdown}
      >
        {selectedItem}
      </button>
      {dropdownVisible && (
        <div
          id="dropdown"
          className="absolute z-10 w-56 rounded-lg bg-white p-3 shadow dark:bg-gray-700"
          style={{
            top: "100%",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          <form>
            <input
              type="text"
              placeholder="Search status..."
              value={searchKeyword}
              onChange={handleSearchChange}
              className="mb-3 cursor-text rounded border p-2 text-sm"
            />
            <ul className="space-y-2 text-sm">
              {statusItems.map((item) => (
                <li
                  key={item.value}
                  className={`cursor-pointer items-center ${
                    selectedItem === item.value ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleStatusUpdate(item.label)}
                >
                  <label
                    className={`ml-2 font-medium ${
                      item.style
                        ? item.style
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
