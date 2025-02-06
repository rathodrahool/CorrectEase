import React from "react";

const Editor: React.FC = () => {
  return (
    <div className="h-full w-full max-w-[50rem] mx-auto">
      <div className="m-6 bg-white border border-[#DFE1E6] rounded-sm shadow-sm">
        <div className="px-8 py-6">
          <div className="prose max-w-none">
            <textarea
              className="w-full min-h-[calc(100vh-8rem)] resize-none text-[#172B4D] text-base 
                placeholder-[#7A869A] focus:outline-none focus:border-[#2684FF] 
                bg-white rounded-sm p-2"
              placeholder="Add your description..."
              style={{ lineHeight: "1.5" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
