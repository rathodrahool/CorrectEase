import React from "react";
import { FiSearch, FiPlus, FiClock, FiLock } from "react-icons/fi";

const Navigation: React.FC = () => {
  return (
    <nav className="w-72 h-screen bg-white border-r border-gray-200 p-6 flex flex-col sticky top-0">
      <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2.5 mb-6">
        <FiSearch className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-3 w-full bg-transparent focus:outline-none text-sm text-gray-600 placeholder-gray-400"
        />
      </div>

      <button className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors mb-8 shadow-sm">
        <FiPlus className="w-5 h-5" />
        <span className="font-medium">New Doc</span>
      </button>

      <div className="mb-8">
        <h3 className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 mb-3 px-2">
          <FiClock className="w-4 h-4" />
          <span>Recent</span>
        </h3>
        <ul className="space-y-1">
          {/* Recent items will be populated here */}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 mb-3 px-2">
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
