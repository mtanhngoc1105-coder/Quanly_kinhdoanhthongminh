
import { BrowserRouter} from "react-router-dom";
//import RobotAssistantFloating from "./components/ai/RobotAssistantFloating";
import AppRoutes from "./routes";
function App() {
  return (
    <BrowserRouter> 
    <AppRoutes />
    </BrowserRouter> 
    
  );
}

export default App;