import React from "react";
import {
  FiCopy,
  FiCheckCircle,
  FiRotateCcw,
  FiSliders,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

interface CorrectionStyle {
  id: string;
  name: string;
  description: string;
}

interface SavedText {
  id: string;
  userId: string;
  originalText: string;
  enhancedText: string;
  style: string;
  timestamp: string;
}

const correctionStyles: CorrectionStyle[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Clear and correct English",
  },
  {
    id: "formal",
    name: "Formal",
    description: "Professional and sophisticated",
  },
  { id: "casual", name: "Casual", description: "Friendly and conversational" },
  { id: "concise", name: "Concise", description: "Short and to the point" },
];

const Editor: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = React.useState("standard");
  const [selectedUser, setSelectedUser] = React.useState("");
  const [originalText, setOriginalText] = React.useState("");
  const [enhancedText, setEnhancedText] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Mock users - this would come from your chat list
  const mockUsers = [
    { id: "1", name: "Yagnik Gohil" },
    { id: "2", name: "Tushar Panchal" },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedUserData = mockUsers.find((user) => user.id === selectedUser);

  const handleTextChange = (text: string) => {
    setOriginalText(text);
    // Auto-save logic would go here
    if (selectedUser) {
      saveText(text);
    }
  };

  const saveText = (text: string) => {
    // Save to localStorage or your backend
    const savedText: SavedText = {
      id: Date.now().toString(),
      userId: selectedUser,
      originalText: text,
      enhancedText: enhancedText, // This would be the processed text
      style: selectedStyle,
      timestamp: new Date().toISOString(),
    };
    // Save logic here
  };

  return (
    <div className="h-full max-w-5xl mx-auto p-6">
      <div className="bg-white border border-[#DFE1E6] rounded-sm shadow-sm">
        {/* User Selection Header */}
        <div className="px-6 py-3 border-b border-[#DFE1E6] flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#42526E]">
            <FiUser className="w-4 h-4" />
            <span className="text-sm font-medium">Select Chat:</span>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[#DFE1E6] 
                rounded-sm text-[#172B4D] hover:bg-[#F4F5F7] transition-colors
                focus:border-[#2684FF] focus:outline-none focus:ring-2 
                focus:ring-[#2684FF] focus:ring-opacity-25 min-w-[200px]
                justify-between"
            >
              <div className="flex items-center gap-2">
                {selectedUser ? (
                  <>
                    <div
                      className="w-6 h-6 bg-[#DFE1E6] rounded-sm flex items-center 
                      justify-center text-[#42526E] text-xs font-medium"
                    >
                      {selectedUserData?.name.charAt(0)}
                    </div>
                    <span>{selectedUserData?.name}</span>
                  </>
                ) : (
                  <span className="text-[#7A869A]">Select a user</span>
                )}
              </div>
              <FiChevronDown
                className={`w-4 h-4 text-[#42526E] transition-transform
                ${isDropdownOpen ? "transform rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-full bg-white border 
                border-[#DFE1E6] rounded-sm shadow-lg z-10 py-1"
              >
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm
                      hover:bg-[#F4F5F7] transition-colors
                      ${
                        selectedUser === user.id
                          ? "bg-[#DEEBFF] text-[#0052CC]"
                          : "text-[#172B4D]"
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-sm flex items-center justify-center 
                      text-xs font-medium
                      ${
                        selectedUser === user.id
                          ? "bg-[#0052CC] text-white"
                          : "bg-[#DFE1E6] text-[#42526E]"
                      }`}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <span>{user.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Style Selection Header */}
        <div className="px-6 py-4 border-b border-[#DFE1E6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {correctionStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors
                  ${
                    selectedStyle === style.id
                      ? "bg-[#DEEBFF] text-[#0052CC]"
                      : "text-[#42526E] hover:bg-[#F4F5F7]"
                  }`}
              >
                {style.name}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-[#42526E] hover:bg-[#F4F5F7] px-3 py-1.5 rounded-sm transition-colors">
            <FiSliders className="w-4 h-4" />
            <span className="text-sm font-medium">Customize</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-2 divide-x divide-[#DFE1E6]">
          {/* Original Text */}
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#42526E]">
                Original Text
              </h3>
              <button className="text-[#42526E] hover:bg-[#F4F5F7] p-1.5 rounded-sm transition-colors">
                <FiRotateCcw className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={originalText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={
                selectedUser
                  ? "Paste your chat message here..."
                  : "Please select a user first..."
              }
              disabled={!selectedUser}
              className="w-full min-h-[calc(100vh-20rem)] resize-none text-[#172B4D] text-sm 
                placeholder-[#7A869A] focus:outline-none focus:border-[#2684FF]
                disabled:bg-[#F4F5F7] disabled:cursor-not-allowed"
            />
          </div>

          {/* Corrected Text */}
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#42526E]">
                Enhanced Version
              </h3>
              <button className="text-[#42526E] hover:bg-[#F4F5F7] p-1.5 rounded-sm transition-colors">
                <FiCopy className="w-4 h-4" />
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-[#172B4D]">
              <p>{enhancedText || "Your enhanced text will appear here..."}</p>
              <div className="mt-4 flex items-center gap-2 text-[#0052CC] bg-[#DEEBFF] px-3 py-2 rounded-sm">
                <FiCheckCircle className="w-4 h-4" />
                <span className="text-sm">
                  {selectedUser
                    ? "Changes will be saved automatically"
                    : "Select a user to start"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
