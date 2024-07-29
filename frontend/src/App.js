import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPost from "./pages/Post/myPost";
import AllPost from "./pages/Post/allPost";
import SavePost from "./pages/Post/savePost";
import Mainpage from "./pages/Mainpage";
import Question from "./pages/Questionpage";
import Login from "./components/login";
import Signup from "./components/signup";
import PostDetail from "./pages/Post/postDetail";
import Live from "./pages/Live";
import PostCreate from "./pages/Post/postCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myPost" element={<MyPost />} />
        <Route path="/allPost" element={<AllPost />} />
        <Route path="/savePost" element={<SavePost />} />
        <Route path="/postCreate" element={<PostCreate />} />
        <Route path="/live" element={<Live />} />
        <Route path="/postDetail/:articleId" element={<PostDetail />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="/question" element={<Question />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
