import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Bg from "./bg";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Bg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
