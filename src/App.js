import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
//import RobotAssistantFloating from "./components/ai/RobotAssistantFloating";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Định tuyến toàn bộ các trang trong ứng dụng */}
        <AppRoutes />
  
      </div>
    </BrowserRouter>
  );
}

export default App;