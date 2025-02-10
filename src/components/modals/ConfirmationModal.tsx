import React from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 backdrop-blur-sm bg-[#091E42]/30 transition-opacity"
        onClick={onClose}
      />
      <div className="bg-white rounded-sm shadow-xl w-full max-w-md relative z-50">
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#DFE1E6]">
          <h2 className="text-[#172B4D] font-medium flex items-center gap-2">
            <FiAlertTriangle className="w-5 h-5 text-[#FF5630]" />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#42526E] hover:bg-[#F4F5F7] p-1 rounded-sm transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-[#42526E] mb-6">{message}</p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm font-medium text-[#42526E] 
                hover:bg-[#F4F5F7] rounded-sm transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-3 py-2 text-sm font-medium text-white bg-[#FF5630]
                hover:bg-[#FF7452] rounded-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
