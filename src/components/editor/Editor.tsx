import React from "react";
import { FiCopy, FiCheckCircle, FiRotateCcw, FiSliders } from "react-icons/fi";

interface CorrectionStyle {
  id: string;
  name: string;
  description: string;
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

  return (
    <div className="h-full max-w-5xl mx-auto p-6">
      <div className="bg-white border border-[#DFE1E6] rounded-sm shadow-sm">
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
              placeholder="Paste your chat message here..."
              className="w-full min-h-[calc(100vh-16rem)] resize-none text-[#172B4D] text-sm 
                placeholder-[#7A869A] focus:outline-none focus:border-[#2684FF]"
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
              <p>Your enhanced text will appear here...</p>
              <div className="mt-4 flex items-center gap-2 text-[#0052CC] bg-[#DEEBFF] px-3 py-2 rounded-sm">
                <FiCheckCircle className="w-4 h-4" />
                <span className="text-sm">Ready to enhance your text</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
