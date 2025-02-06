import React from "react";
import { FiCopy, FiCheck, FiCalendar } from "react-icons/fi";
import { CorrectionEntry } from "../../types";

interface CorrectionHistoryProps {
  userId: string;
}

const CorrectionHistory: React.FC<CorrectionHistoryProps> = ({ userId }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const mockUserCorrections: Record<string, CorrectionEntry[]> = {
    "1": [
      {
        id: "1",
        userId: "1",
        originalText: "hey can you correct my grammer?",
        enhancedText: "Hey, can you correct my grammar?",
        style: "Standard",
        timestamp: "10:30 AM",
      },
    ],
    "2": [
      {
        id: "2",
        userId: "2",
        originalText: "thanks for helping me with the project yesterday",
        enhancedText: "Thank you for assisting me with the project yesterday.",
        style: "Formal",
        timestamp: "Yesterday",
      },
    ],
  };

  const userCorrections = mockUserCorrections[userId] || [];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full text-[#42526E]">
        <span>Select a user to view their correction history</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-4">
        {userCorrections.map((entry) => (
          <div key={entry.id} className="bg-white border border-[#DFE1E6]">
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-[#7A869A]">Original Text</label>
                <p className="text-sm text-[#172B4D]">{entry.originalText}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#7A869A]">
                    Enhanced Text
                  </label>
                  <button
                    onClick={() => handleCopy(entry.enhancedText, entry.id)}
                    className="flex items-center gap-1 p-1 text-[#42526E] hover:bg-[#F4F5F7]"
                  >
                    {copiedId === entry.id ? (
                      <FiCheck className="w-4 h-4" />
                    ) : (
                      <FiCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-[#172B4D] bg-[#DEEBFF] p-2">
                  {entry.enhancedText}
                </p>
              </div>
            </div>
          </div>
        ))}

        {userCorrections.length === 0 && (
          <div className="text-center text-[#42526E]">
            No corrections available
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectionHistory;
