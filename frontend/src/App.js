import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./components/UpdateBlog";



const App = () => (
  <Router>
    <Navbar />
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<UpdateBlog />} />
      </Routes>
    </div>
  </Router>
);

export default App;
