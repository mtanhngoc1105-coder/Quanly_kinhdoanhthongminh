
import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
//import RobotAssistantFloating from "./components/ai/RobotAssistantFloating";

function App() {
  return (
    <BrowserRouter>

      <AppRoutes />

    </BrowserRouter>

import "./App.css";
import RobotAssistantFloating from "./components/ai/RobotAssistantFloating";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RobotAssistantFloating />
    </div>
  );
}

export default App;
