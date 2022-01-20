import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import GetCourses from "./Components/GetCourses.js"
import GetNotes from "./Components/GetNotes.js"
import Nav from "./Nav";

function App() {

  return (

    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:notesId" element={null} />
        <Route path="/notes" element={<GetNotes />} />
        <Route path="/courses" element={<GetCourses />} />
        <Route path="/courses/:courseId" element={null} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
