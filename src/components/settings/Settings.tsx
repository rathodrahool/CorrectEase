import React from "react";
import { FiSave, FiKey, FiToggleLeft, FiToggleRight } from "react-icons/fi";

interface AIProvider {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  apiKey: string;
}

const Settings: React.FC = () => {
  const [aiProviders, setAiProviders] = React.useState<AIProvider[]>([
    {
      id: "openai",
      name: "OpenAI (ChatGPT)",
      description: "Use OpenAI's GPT models for text enhancement",
      isEnabled: false,
      apiKey: "",
    },
    {
      id: "google",
      name: "Google AI",
      description: "Integrate with Google's language models",
      isEnabled: false,
      apiKey: "",
    },
    {
      id: "claude",
      name: "Anthropic Claude",
      description: "Use Claude AI for advanced text processing",
      isEnabled: false,
      apiKey: "",
    },
  ]);

  const handleToggleProvider = (providerId: string) => {
    setAiProviders((providers) =>
      providers.map((provider) =>
        provider.id === providerId
          ? { ...provider, isEnabled: !provider.isEnabled }
          : provider
      )
    );
  };

  const handleApiKeyChange = (providerId: string, apiKey: string) => {
    setAiProviders((providers) =>
      providers.map((provider) =>
        provider.id === providerId ? { ...provider, apiKey } : provider
      )
    );
  };

  const handleSaveSettings = () => {
    // Here you would implement the logic to save the settings
    console.log("Saving AI provider settings:", aiProviders);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border border-[#DFE1E6] rounded-sm shadow-sm">
        <div className="border-b border-[#DFE1E6] px-6 py-4">
          <h2 className="text-xl font-semibold text-[#172B4D]">
            AI Integration Settings
          </h2>
          <p className="text-sm text-[#7A869A] mt-1">
            Configure your AI providers for text enhancement
          </p>
        </div>

        <div className="p-6 space-y-6">
          {aiProviders.map((provider) => (
            <div
              key={provider.id}
              className="border border-[#DFE1E6] rounded-sm p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[#172B4D]">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-[#7A869A]">
                    {provider.description}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleProvider(provider.id)}
                  className={`p-2 rounded-full transition-colors
                    ${
                      provider.isEnabled
                        ? "text-[#0052CC] hover:bg-[#DEEBFF]"
                        : "text-[#7A869A] hover:bg-[#F4F5F7]"
                    }`}
                >
                  {provider.isEnabled ? (
                    <FiToggleRight className="w-6 h-6" />
                  ) : (
                    <FiToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>

              {provider.isEnabled && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#172B4D]">
                    API Key
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 relative">
                      <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                      <input
                        type="password"
                        value={provider.apiKey}
                        onChange={(e) =>
                          handleApiKeyChange(provider.id, e.target.value)
                        }
                        placeholder={`Enter your ${provider.name} API key`}
                        className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] 
                          focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] 
                          focus:ring-opacity-25"
                      />
                    </div>
                    <a
                      href="#"
                      className="text-sm text-[#0052CC] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get API Key
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-2 px-4 py-2 bg-[#0052CC] 
                text-white hover:bg-[#0065FF] transition-colors"
            >
              <FiSave className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
