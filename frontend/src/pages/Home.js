import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "../components/BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`);
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  return (
    <div>
      <h2>Blog List</h2>
      <BlogList blogs={blogs} onDelete={handleDeleteBlog} />
    </div>
  );
};

export default Home;
