import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPost from "./pages/Post/myPost";
import AllPost from "./pages/Post/allPost";
import SavePost from "./pages/Post/savePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myPost" element={<MyPost />} />
        <Route path="/allPost" element={<AllPost />} />
        <Route path="/savePost" element={<SavePost />} />
      </Routes>
    </Router>
  );
}

export default App;
