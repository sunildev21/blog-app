import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!blog) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-lg p-4">
        <h2 className="card-title text-center mb-4">{blog.title}</h2>
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${blog.image}`}
          alt="Blog cover"
          className="card-img-top mb-4 rounded"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <p className="card-text lead">{blog.content}</p>
          <p className="text-muted text-end">By: <strong>{blog.author}</strong></p>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              <i className="bi bi-trash3"></i> Delete
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate(`/edit/${blog._id}`, { state: blog })}
            >
              <i className="bi bi-pencil-square"></i> Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
