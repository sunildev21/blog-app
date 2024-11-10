import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const UpdateBlog = () => {
  const { id } = useParams();
  const location = useLocation();
  const [initialData, setInitialData] = useState(location.state || null); // Get blog data from state
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialData) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/blogs/${id}`
          );
          setInitialData(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };
      fetchBlog();
    }
  }, [id, initialData]);

  const handleUpdateBlog = async (data) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`, data);
      navigate(`/blogs/${id}`); // Redirect to the blog detail page after update
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!initialData) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Update Blog</h2>
      <BlogForm
        initialData={initialData}
        onSubmit={handleUpdateBlog}
        buttonText="Update Blog"
      />
    </div>
  );
};

export default UpdateBlog;
