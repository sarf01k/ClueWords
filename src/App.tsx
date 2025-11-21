import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Play from "./pages/quiz/Play";
import Results from "./pages/quiz/Results";
import NotFound from "./pages/auth/Not-Found";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
