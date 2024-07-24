import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPost from "./pages/Post/myPost";
import AllPost from "./pages/Post/allPost";
import SavePost from "./pages/Post/savePost";
import Mainpage from "./pages/Mainpage";
import Question from "./pages/Questionpage";
import PostDetail from "./pages/Post/postDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myPost" element={<MyPost />} />
        <Route path="/allPost" element={<AllPost />} />
        <Route path="/savePost" element={<SavePost />} />
        <Route path="/postDetail" element={<PostDetail />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
