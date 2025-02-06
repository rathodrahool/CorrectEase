import React from "react";
import { FiX } from "react-icons/fi";

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: CustomizeSettings) => void;
}

export interface CustomizeSettings {
  tone: number;
  formality: number;
  length: number;
  creativity: number;
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [settings, setSettings] = React.useState<CustomizeSettings>({
    tone: 50,
    formality: 50,
    length: 50,
    creativity: 50,
  });

  if (!isOpen) return null;

  const handleSliderChange = (
    setting: keyof CustomizeSettings,
    value: number
  ) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-white/50 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white w-full max-w-md shadow-xl relative">
          <div className="flex items-center justify-between border-b border-[#DFE1E6] px-6 py-4">
            <h2 className="text-[#172B4D] font-medium">
              Customize Enhancement
            </h2>
            <button
              onClick={onClose}
              className="text-[#42526E] hover:bg-[#F4F5F7] p-2 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Tone Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-[#42526E]">Tone</label>
                <span className="text-xs text-[#7A869A]">
                  {settings.tone < 50 ? "Professional" : "Casual"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.tone}
                onChange={(e) =>
                  handleSliderChange("tone", Number(e.target.value))
                }
                className="w-full accent-[#0052CC]"
              />
            </div>

            {/* Formality Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-[#42526E]">Formality</label>
                <span className="text-xs text-[#7A869A]">
                  {settings.formality < 50 ? "Informal" : "Formal"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.formality}
                onChange={(e) =>
                  handleSliderChange("formality", Number(e.target.value))
                }
                className="w-full accent-[#0052CC]"
              />
            </div>

            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-[#42526E]">Length</label>
                <span className="text-xs text-[#7A869A]">
                  {settings.length < 50 ? "Concise" : "Detailed"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.length}
                onChange={(e) =>
                  handleSliderChange("length", Number(e.target.value))
                }
                className="w-full accent-[#0052CC]"
              />
            </div>

            {/* Creativity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-[#42526E]">Creativity</label>
                <span className="text-xs text-[#7A869A]">
                  {settings.creativity < 50 ? "Conservative" : "Creative"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.creativity}
                onChange={(e) =>
                  handleSliderChange("creativity", Number(e.target.value))
                }
                className="w-full accent-[#0052CC]"
              />
            </div>
          </div>

          <div className="border-t border-[#DFE1E6] px-6 py-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#42526E] hover:bg-[#F4F5F7] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(settings)}
              className="px-4 py-2 text-sm bg-[#0052CC] text-white hover:bg-[#0065FF] transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
