import React from "react";
import { FiX } from "react-icons/fi";

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; jobProfile: string }) => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = React.useState("");
  const [jobProfile, setJobProfile] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, jobProfile });
    setName("");
    setJobProfile("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 backdrop-blur-sm bg-[#091E42]/30 transition-opacity"
        onClick={onClose}
      />
      <div
        className="bg-white rounded-sm shadow-xl w-full max-w-md relative z-50 
        transition-all transform scale-100 opacity-100"
      >
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#DFE1E6]">
          <h2 className="text-[#172B4D] font-medium">Create New Chat</h2>
          <button
            onClick={onClose}
            className="text-[#42526E] hover:bg-[#F4F5F7] p-1 rounded-sm transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#172B4D] mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-[#DFE1E6] rounded-sm text-sm
                  text-[#172B4D] placeholder-[#7A869A] focus:outline-none
                  focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="jobProfile"
                className="block text-sm font-medium text-[#172B4D] mb-1"
              >
                Job Profile
              </label>
              <input
                type="text"
                id="jobProfile"
                value={jobProfile}
                onChange={(e) => setJobProfile(e.target.value)}
                className="w-full px-3 py-2 border border-[#DFE1E6] rounded-sm text-sm
                  text-[#172B4D] placeholder-[#7A869A] focus:outline-none
                  focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                placeholder="Enter job profile"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm font-medium text-[#42526E] 
                hover:bg-[#F4F5F7] rounded-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium text-white bg-[#0052CC]
                hover:bg-[#0065FF] rounded-sm transition-colors"
            >
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChatModal;
