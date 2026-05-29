import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
//import RobotAssistantFloating from "./components/ai/RobotAssistantFloating";

function App() {
  return (
    <BrowserRouter>

      <AppRoutes />

    </BrowserRouter>
  );
}

export default App;