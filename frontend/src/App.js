import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Nav from "./Nav";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/photos/:photoId" element={<Photo />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
