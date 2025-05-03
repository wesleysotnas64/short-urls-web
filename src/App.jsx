import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/home/Home";
import Load from "./pages/load/Load";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:hash" element={<Load />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
