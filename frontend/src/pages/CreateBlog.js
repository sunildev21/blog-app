import React from "react";
import BlogForm from "../components/BlogForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const handleCreateBlog = async (data) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/blogs`, data);
    navigate("/");
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <BlogForm onSubmit={handleCreateBlog} buttonText="Create Blog" />
    </div>
  );
};

export default CreateBlog;
