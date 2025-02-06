import React from "react";
import { FiSend, FiCheck, FiEdit2 } from "react-icons/fi";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  isCorrection?: boolean;
}

const Chat: React.FC = () => {
  const [message, setMessage] = React.useState("");
  const messagesEndRef = React.useState<HTMLDivElement | null>(null);

  const mockMessages: Message[] = [
    {
      id: "1",
      text: "hey can you correct my grammer?",
      sender: "other",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      text: "Hey, can you correct my grammar?",
      sender: "other",
      timestamp: "10:30 AM",
      isCorrection: true,
    },
    {
      id: "3",
      text: "Of course! Send me the text you'd like me to check.",
      sender: "user",
      timestamp: "10:31 AM",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="px-6 py-3 border-b border-[#DFE1E6] bg-white flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#DFE1E6] rounded-sm flex items-center justify-center text-[#42526E] font-medium">
            Y
          </div>
          <div>
            <h2 className="text-[#172B4D] font-medium">Yagnik Gohil</h2>
            <span className="text-xs text-[#7A869A]">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-[#0052CC] text-white"
                  : msg.isCorrection
                  ? "bg-[#00875A] text-white"
                  : "bg-[#F4F5F7] text-[#172B4D]"
              } rounded-sm px-4 py-2 shadow-sm`}
            >
              <p className="text-sm">{msg.text}</p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="text-xs opacity-75">{msg.timestamp}</span>
                {msg.isCorrection && <FiCheck className="w-3 h-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-[#DFE1E6] bg-white">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-[#F4F5F7] rounded-sm">
            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 text-sm text-[#172B4D] placeholder-[#7A869A] 
                bg-transparent resize-none focus:outline-none"
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
          </div>
          <button
            className="p-2 bg-[#0052CC] text-white rounded-sm hover:bg-[#0065FF] 
            transition-colors flex items-center justify-center"
          >
            <FiSend className="w-4 h-4" />
          </button>
          <button
            className="p-2 border border-[#DFE1E6] text-[#42526E] rounded-sm 
            hover:bg-[#F4F5F7] transition-colors flex items-center justify-center"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
