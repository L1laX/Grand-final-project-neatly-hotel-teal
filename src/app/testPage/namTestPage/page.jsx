"use client";

import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="flex border-b border-gray-200">
        <button
          className={`${
            activeTab === "Tab1" ? "border-b-2 border-blue-500" : ""
          } px-4 py-2 focus:outline-none`}
          onClick={() => handleTabClick("Tab1")}
        >
          Tab 1
        </button>
        <button
          className={`${
            activeTab === "Tab2" ? "border-b-2 border-blue-500" : ""
          } px-4 py-2 focus:outline-none`}
          onClick={() => handleTabClick("Tab2")}
        >
          Tab 2
        </button>
        <button
          className={`${
            activeTab === "Tab3" ? "border-b-2 border-blue-500" : ""
          } px-4 py-2 focus:outline-none`}
          onClick={() => handleTabClick("Tab3")}
        >
          Tab 3
        </button>
      </div>
      <div className="mt-8">
        {activeTab === "Tab1" && <div>Content for Tab 1</div>}
        {activeTab === "Tab2" && <div>Content for Tab 2</div>}
        {activeTab === "Tab3" && <div>Content for Tab 3</div>}
      </div>
    </div>
  );
};

export default Tabs;
