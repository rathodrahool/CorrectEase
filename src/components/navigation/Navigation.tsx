import React from "react";
import { FiSearch, FiPlus, FiClock, FiLock } from "react-icons/fi";

const Navigation: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center bg-white rounded px-3 py-2 mb-4 shadow-sm">
        <FiSearch className="text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full focus:outline-none text-sm"
        />
      </div>

      <button className="w-full py-2 px-3 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700 transition-colors mb-6">
        <FiPlus className="w-4 h-4" />
        <span>New Doc</span>
      </button>

      <div className="mb-6">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FiClock className="w-4 h-4" />
          <span>Recent</span>
        </h3>
        <ul className="space-y-1">
          {/* Recent items will be populated here */}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FiLock className="w-4 h-4" />
          <span>Private Writing</span>
        </h3>
        <ul className="space-y-1">
          {/* Private documents will be populated here */}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
