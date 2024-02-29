import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Algorithm from "./components/algorithm/algorithm";
import NotFound from "./components/notfound";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/algorithm" Component={Algorithm} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default App;
