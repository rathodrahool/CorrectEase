import React from "react";
import {
  FiCopy,
  FiCheckCircle,
  FiRotateCcw,
  FiSliders,
  FiUser,
  FiChevronDown,
  FiSend,
  FiBookOpen,
} from "react-icons/fi";
import CustomizeModal, { CustomizeSettings } from "./CustomizeModal";
import { TextEnhancerService } from "../../services/textEnhancerService";
import { chatService } from "../../services/chatService";
import type { Chat } from "../../types/chat";
import { useAutoSave } from "../../hooks/useAutoSave";
import SaveStatus from "../common/SaveStatus";
import { useUser } from "../../context/UserContext";
import type { User } from "../../types/user";

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

interface EnhancedVersion {
  id: string;
  text: string;
  style: string;
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
  const [charCount, setCharCount] = React.useState(0);
  const [wordCount, setWordCount] = React.useState(0);
  const [enhancedVersions, setEnhancedVersions] = React.useState<
    EnhancedVersion[]
  >([]);
  const [isEnhancing, setIsEnhancing] = React.useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = React.useState(false);
  const [customSettings, setCustomSettings] = React.useState<CustomizeSettings>(
    {
      tone: 50,
      formality: 50,
      length: 50,
      creativity: 50,
    }
  );
  const [copiedVersionId, setCopiedVersionId] = React.useState<string | null>(
    null
  );
  const [isDirty, setIsDirty] = React.useState(false);

  const {
    users,
    isLoading: isLoadingUsers,
    error: userError,
    fetchUsers,
  } = useUser();

  const selectedUserData = users.find((user) => user.id === selectedUser);

  const handleSave = React.useCallback(async () => {
    if (!selectedUser || !originalText || enhancedVersions.length === 0) return;

    try {
      const createData: CreateChatDto = {
        originalText,
        enhancedTexts: enhancedVersions.map((version) => ({
          text: version.text,
          type: version.style,
        })),
      };

      await chatService.createChat(selectedUser, createData);
      setIsDirty(false);
    } catch (error) {
      console.error("Error saving chat:", error);
      throw error;
    }
  }, [selectedUser, originalText, enhancedVersions]);

  const { setHasChanges, saveState, scheduleSave } = useAutoSave({
    onSave: handleSave,
    delay: 5000, // 5 seconds delay
  });

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

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  React.useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0].id);
    }
  }, [users, selectedUser]);

  const updateCounts = (text: string) => {
    setCharCount(text.length);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  };

  const getStorageKey = (userId: string) => `userText_${userId}`;

  React.useEffect(() => {
    if (selectedUser) {
      const savedText = localStorage.getItem(getStorageKey(selectedUser));
      if (savedText) {
        setOriginalText(savedText);
        updateCounts(savedText);
      } else {
        setOriginalText("");
        updateCounts("");
      }
    }
  }, [selectedUser]);

  const handleTextChange = React.useCallback(
    (text: string) => {
      setOriginalText(text);
      updateCounts(text);
      if (selectedUser) {
        localStorage.setItem(getStorageKey(selectedUser), text);
      }
    },
    [selectedUser]
  );

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      const customization =
        TextEnhancerService.mapCustomizationToApi(customSettings);
      const result = await TextEnhancerService.enhanceText({
        text: originalText,
        style: selectedStyle,
        customization,
      });

      if (result.status === 1) {
        setEnhancedVersions(
          result.data.enhancedVersions.map((text, index) => ({
            id: index.toString(),
            text,
            style: selectedStyle,
          }))
        );
        // Only trigger save after successful enhancement
        setIsDirty(true);
        setHasChanges(true);
        scheduleSave(); // Schedule save with 5 second delay
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error enhancing text:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (isDirty) {
        handleSave().catch(console.error);
      }
    };
  }, [isDirty, handleSave]);

  const saveText = (text: string) => {
    const savedText: SavedText = {
      id: Date.now().toString(),
      userId: selectedUser,
      originalText: text,
      enhancedText: enhancedText,
      style: selectedStyle,
      timestamp: new Date().toISOString(),
    };
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(enhancedText);
    setTimeout(() => setCopiedVersionId(null), 2000);
  };

  const insertDemoText = () => {
    const demoText =
      "This is a sample text that needs to be enhanced. Please help me make it better.";
    handleTextChange(demoText);
  };

  const handleCustomizeClose = () => {
    setIsCustomizeOpen(false);
  };

  const handleCustomizeSave = (settings: CustomizeSettings) => {
    setCustomSettings(settings);
    setIsCustomizeOpen(false);
  };

  const handleCopyVersion = async (text: string, versionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedVersionId(versionId);
      setTimeout(() => setCopiedVersionId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const dropdownButton = (
    <button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[#DFE1E6] 
        text-[#172B4D] hover:bg-[#F4F5F7] transition-colors
        focus:border-[#2684FF] focus:outline-none focus:ring-2 
        focus:ring-[#2684FF] focus:ring-opacity-25 min-w-[200px]
        justify-between"
    >
      {isLoadingUsers ? (
        <span className="text-[#7A869A]">Loading users...</span>
      ) : userError ? (
        <span className="text-red-600">Error loading users</span>
      ) : (
        <div className="flex items-center gap-2">
          {selectedUser && selectedUserData ? (
            <>
              <div
                className="w-6 h-6 bg-[#DFE1E6] flex items-center 
                justify-center text-[#42526E] text-xs font-medium"
              >
                {selectedUserData.name.charAt(0)}
              </div>
              <span>{selectedUserData.name}</span>
            </>
          ) : (
            <span className="text-[#7A869A]">Select a user</span>
          )}
        </div>
      )}
      <FiChevronDown
        className={`w-4 h-4 text-[#42526E] transition-transform
          ${isDropdownOpen ? "transform rotate-180" : ""}`}
      />
    </button>
  );

  const dropdownMenu = isDropdownOpen && (
    <div
      className="absolute top-full left-0 mt-1 w-full bg-white border 
      border-[#DFE1E6] shadow-lg z-40 py-1 max-h-60 overflow-y-auto"
    >
      {users.map((user) => (
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
            className={`w-6 h-6 flex items-center justify-center 
            text-xs font-medium
            ${
              selectedUser === user.id
                ? "bg-[#0052CC] text-white"
                : "bg-[#DFE1E6] text-[#42526E]"
            }`}
          >
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 text-left">
            <span className="block font-medium">{user.name}</span>
            <span className="text-xs text-[#7A869A]">{user.jobProfile}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="h-full max-w-5xl mx-auto p-6">
      <div className="bg-white border border-[#DFE1E6] shadow-sm">
        <div className="px-6 py-3 border-b border-[#DFE1E6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#42526E]">
              <FiUser className="w-4 h-4" />
              <span className="text-sm font-medium">Select Chat:</span>
            </div>
            <div className="relative" ref={dropdownRef}>
              {dropdownButton}
              {dropdownMenu}
            </div>
          </div>
          {selectedUser && <SaveStatus state={saveState} />}
        </div>
        <div className="px-6 py-4 border-b border-[#DFE1E6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {correctionStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors
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
          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-2 text-[#42526E] hover:bg-[#F4F5F7] px-3 py-1.5 transition-colors"
          >
            <FiSliders className="w-4 h-4" />
            <span className="text-sm font-medium">Customize</span>
          </button>
        </div>
        <div className="grid grid-cols-2 divide-x divide-[#DFE1E6]">
          <div className="p-6 flex flex-col h-[calc(100vh-15rem)]">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-[#42526E]">
                  Original Text
                </h3>
                <span className="text-xs text-[#7A869A]">
                  {charCount} chars | {wordCount} words
                </span>
              </div>
              <button
                onClick={() => handleTextChange("")}
                className="text-[#42526E] hover:bg-[#F4F5F7] p-1.5 transition-colors group relative"
                title="Clear text"
              >
                <FiRotateCcw className="w-4 h-4" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#172B4D] text-white text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Clear text
                </span>
              </button>
            </div>
            <div className="relative flex-grow">
              <textarea
                value={originalText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={
                  selectedUser
                    ? "Paste your chat message here..."
                    : "Please select a user first..."
                }
                disabled={!selectedUser}
                className="w-full h-full resize-none text-[#172B4D] text-sm p-4
                  placeholder-[#7A869A] focus:outline-none border border-[#DFE1E6] 
                  focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] 
                  focus:ring-opacity-25 disabled:bg-[#F4F5F7] disabled:cursor-not-allowed
                  transition-all duration-200"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={insertDemoText}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#F4F5F7] text-[#42526E] 
                    hover:bg-[#DEEBFF] transition-colors"
                >
                  <FiBookOpen className="w-4 h-4" />
                  <span className="text-sm">Try Demo</span>
                </button>
                {originalText.length > 0 && (
                  <button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#0052CC] text-white
                      hover:bg-[#0065FF] transition-colors disabled:opacity-50"
                  >
                    <FiSend className="w-4 h-4" />
                    <span className="text-sm">
                      {isEnhancing ? "Enhancing..." : "Enhance"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col h-[calc(100vh-15rem)]">
            <h3 className="text-sm font-medium text-[#42526E] mb-3">
              Enhanced Versions
            </h3>
            <div className="flex-grow border border-[#DFE1E6] p-4 overflow-y-auto">
              {enhancedVersions.length > 0 ? (
                <div className="space-y-4">
                  {enhancedVersions.map((version) => (
                    <div
                      key={version.id}
                      className="border border-[#DFE1E6] p-4 group relative"
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <span className="text-xs font-medium text-[#0052CC] bg-[#DEEBFF] px-2 py-1">
                          {version.style.charAt(0).toUpperCase() +
                            version.style.slice(1)}
                        </span>
                        <button
                          onClick={() =>
                            handleCopyVersion(version.text, version.id)
                          }
                          className="text-[#42526E] hover:bg-[#F4F5F7] p-1.5 transition-colors"
                        >
                          {copiedVersionId === version.id ? (
                            <FiCheckCircle className="w-4 h-4 text-[#0052CC]" />
                          ) : (
                            <FiCopy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-[#172B4D] text-sm whitespace-pre-wrap">
                        {version.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-[#7A869A] text-sm">
                  {isEnhancing ? (
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-5 h-5 border-2 border-[#0052CC] border-t-transparent 
                        animate-spin"
                      ></div>
                      <p className="text-[#42526E]">
                        Generating enhancements...
                      </p>
                    </div>
                  ) : (
                    <p>
                      Click the "Enhance" button to get multiple versions of
                      your text
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={handleCustomizeClose}
        onSave={handleCustomizeSave}
      />
    </div>
  );
};

export default Editor;
