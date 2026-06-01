import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { getFakeReply } from "../../services/fakeAI";
import "../../assets/styles/chatbot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Xin chào 👋",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setTimeout(() => {
      const aiMessage = {
        sender: "ai",
        text: getFakeReply(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        <FaRobot />
      </div>

      {open && (
        <motion.div
          className="chat-box"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="chat-header">
            AI Assistant
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "message user"
                    : "message ai"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default ChatBot;