import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogForm = ({ initialData, onSubmit, buttonText = "Submit" }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    author: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Effect to populate form fields with initial data if available
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        image: initialData.image || "",
        content: initialData.content || "",
        author: initialData.author || "",
      });
      setImagePreview(initialData.image ? `${process.env.REACT_APP_API_URL}/uploads/${initialData.image}` : null); // Set image preview if available
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        
        // Replace with your actual upload endpoint
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming the response contains the uploaded image path or filename
        setFormData((prevData) => ({ ...prevData, image: response.data.filename }));
        setImagePreview(URL.createObjectURL(file)); // Optional: Preview the image locally
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).every((field) => field.trim())) {
      onSubmit(formData);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light border rounded">
      <h4 className="mb-3">{buttonText} Blog Post</h4>
      <div className="form-group mb-3">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="img-thumbnail mt-2"
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className="form-control"
          placeholder="Write your blog content here..."
          rows="5"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          className="form-control"
          placeholder="Author's name"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">
        {buttonText}
      </button>
    </form>
  );
};

export default BlogForm;
