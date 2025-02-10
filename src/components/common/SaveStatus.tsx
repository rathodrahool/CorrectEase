import React from "react";
import { FiCheck, FiLoader, FiSave } from "react-icons/fi";

export type SaveState = "saved" | "saving" | "unsaved";

interface SaveStatusProps {
  state: SaveState;
}

const SaveStatus: React.FC<SaveStatusProps> = ({ state }) => {
  const getStatusDetails = () => {
    switch (state) {
      case "saving":
        return {
          icon: <FiLoader className="w-3 h-3 animate-spin" />,
          text: "Saving...",
          className: "text-[#0052CC]",
        };
      case "saved":
        return {
          icon: <FiCheck className="w-3 h-3" />,
          text: "All changes saved",
          className: "text-[#36B37E]",
        };
      case "unsaved":
        return {
          icon: <FiSave className="w-3 h-3" />,
          text: "Unsaved changes",
          className: "text-[#FF8B00]",
        };
    }
  };

  const details = getStatusDetails();

  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-medium ${details.className} transition-all duration-200`}
    >
      {details.icon}
      <span>{details.text}</span>
    </div>
  );
};

export default SaveStatus;
