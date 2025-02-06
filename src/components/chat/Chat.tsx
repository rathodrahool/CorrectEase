import React from "react";
import { FiSend, FiCheck, FiEdit2 } from "react-icons/fi";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
  lastMessage?: string;
  timestamp?: string;
  jobProfile?: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  isCorrection?: boolean;
}

interface ChatProps {
  activeChatId: string;
}

const Chat: React.FC<ChatProps> = ({ activeChatId }) => {
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

  // Add mock users data (should ideally come from a shared data source or context)
  const mockChats: ChatUser[] = [
    {
      id: "1",
      name: "Yagnik Gohil",
      online: true,
      lastMessage: "Last enhanced: 'Thanks for the help...'",
      timestamp: "2m",
      jobProfile: "Software Engineer",
    },
    {
      id: "2",
      name: "Tushar Panchal",
      online: false,
      lastMessage: "Could you check this...",
      timestamp: "1h",
      jobProfile: "Product Manager",
    },
  ];

  // Find the active chat user
  const activeUser = mockChats.find((chat) => chat.id === activeChatId);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="px-6 py-3 border-b border-[#DFE1E6] bg-white flex items-center">
        <div className="flex items-center gap-3">
          {activeUser ? (
            <>
              <div className="w-8 h-8 bg-[#DFE1E6] rounded-sm flex items-center justify-center text-[#42526E] font-medium">
                {activeUser.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-[#172B4D] font-medium">
                  {activeUser.name}
                </h2>
                <span className="text-xs text-[#7A869A]">
                  {activeUser.online ? "Online" : "Offline"}
                </span>
              </div>
            </>
          ) : (
            <div>Select a chat to start messaging</div>
          )}
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
