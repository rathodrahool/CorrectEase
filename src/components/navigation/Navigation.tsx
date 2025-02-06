import React from "react";
import { FiSearch, FiPlus, FiClock, FiLock } from "react-icons/fi";

const Navigation: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-[#FAFBFC] border-r border-[#DFE1E6] flex flex-col sticky top-0">
      <div className="p-4 border-b border-[#DFE1E6]">
        <div className="flex items-center bg-white rounded-sm border border-[#DFE1E6] hover:border-[#2684FF] focus-within:border-[#2684FF] focus-within:shadow-[0_0_0_2px_rgba(38,132,255,0.2)]">
          <FiSearch className="text-[#42526E] w-4 h-4 ml-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-2 text-sm text-[#172B4D] placeholder-[#7A869A] bg-transparent focus:outline-none"
          />
        </div>
      </div>

      <div className="p-4">
        <button className="w-full py-2 px-3 bg-[#0052CC] text-white rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-[#0065FF] transition-colors">
          <FiPlus className="w-4 h-4" />
          <span>Create People</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h3 className="flex items-center text-xs font-medium text-[#42526E] mb-2 uppercase tracking-wide">
            <FiClock className="w-4 h-4 mr-2" />
            <span>Recent</span>
          </h3>
          <ul className="space-y-0.5">{/* Recent items */}</ul>
        </div>

        <div className="px-4 py-2 mt-4">
          <h3 className="flex items-center text-xs font-medium text-[#42526E] mb-2 uppercase tracking-wide">
            <FiLock className="w-4 h-4 mr-2" />
            <span>Private</span>
          </h3>
          <ul className="space-y-0.5">{/* Private items */}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
