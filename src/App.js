import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Bg from "./pages/bg";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Bg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
