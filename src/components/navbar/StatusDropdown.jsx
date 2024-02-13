"use client";

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

  const filteredItems = [
    { value: "vacant", label: "Vacant" },
    { value: "occupied", label: "Occupied" },
    { value: "assignClean", label: "Assign Clean" },
    { value: "assignDirty", label: "Assign Dirty" },
    { value: "vacantClean", label: " Vacant Clean" },
    { value: "vacantCleanInspected", label: "Vacant Clean Inspected" },
    { value: "vacantCleanPick Up", label: "Vacant Clean Pick Up" },
    { value: "occupiedClean", label: "Occupied Clean" },
    { value: "occupiedCleanInspected", label: "Occupied Clean Inspected" },
    { value: "occupiedDirty", label: "Occupied Dirty" },
    { value: "outOfOrder", label: "Out of Order" },
    { value: "outOfService", label: "Out of Service" },
    { value: "outOfInventory", label: "Out of Inventory" },
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
              {filteredItems.map((item) => (
                <li
                  key={item.value}
                  className={`flex cursor-pointer items-center ${
                    selectedItem === item.value ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleStatusUpdate(item.label)}
                >
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
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
