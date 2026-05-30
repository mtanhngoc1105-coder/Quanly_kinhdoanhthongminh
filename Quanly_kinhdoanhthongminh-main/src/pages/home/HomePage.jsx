import { useState } from "react";
import ChatBot from "../../components/ai/ChatBot";
import RobotAssistant from "../../components/ai/RobotAssistant";
import ChatWidget from "../../components/ai/ChatWidget";

function HomePage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <h1>Smart Food</h1>

      <ChatBot />

      <RobotAssistant onRobotClick={() => setShowChat(!showChat)} />

      {showChat && <ChatWidget onClose={() => setShowChat(false)} />}
    </>
  );
}

export default HomePage;