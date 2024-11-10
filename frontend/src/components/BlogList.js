import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BlogList = ({ blogs }) => {
  return (
    <div className="container mt-4">
      {blogs.length === 0 ? (
        <div className="text-center p-5 bg-light rounded shadow-sm">
          <h4 className="text-secondary">No more blogs available.</h4>
          <p className="text-muted">Please create one to get started!</p>
          <Link to="/create" className="btn btn-primary mt-3">
            Create Blog
          </Link>
        </div>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/${blog.image}`}
                  className="card-img-top rounded-top"
                  alt={blog.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{blog.title}</h5>
                  <p className="card-text text-muted">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <div className="mt-auto">
                    <small className="text-muted">By {blog.author}</small>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </small>
                  <Link to={`/blogs/${blog._id}`} className="btn btn-outline-primary btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
