import Home from "./Home";
import HistoryComponent from "./components/HistoryComponent";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HistoryComponent />} />
      </Routes>
    </div>
  );
}

export default App;
