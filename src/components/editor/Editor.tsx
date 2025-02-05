import React from "react";

const Editor: React.FC = () => {
  return (
    <div className="h-full w-full max-w-[50rem] mx-auto">
      <div
        className="bg-white min-h-[calc(100vh-8rem)] relative"
        style={{
          boxShadow:
            "0 0 32px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="px-16 py-12">
          <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
            <input
              type="text"
              placeholder="Untitled Document"
              className="text-3xl font-semibold focus:outline-none text-gray-800 w-full placeholder-gray-300"
            />
          </div>
          <div className="prose prose-lg max-w-none">
            <textarea
              className="w-full min-h-[calc(100vh-16rem)] resize-none border-0 focus:outline-none text-gray-700 text-lg placeholder-gray-300"
              placeholder="Start writing..."
              style={{
                lineHeight: "1.8",
                padding: "0",
              }}
            />
          </div>
        </div>
        <div className="absolute bottom-4 right-6 text-xs text-gray-400 select-none">
          Document
        </div>
      </div>
    </div>
  );
};

export default Editor;
