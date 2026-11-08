import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleRemove = async () => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );
    if (!confirmDelete) return;
    try {
      await blogService.remove(blog.id);
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
    } catch (err) {
      console.error("Error removing blog:", err);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        <span>
          {blog.title} {blog.author}
        </span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <div className="blogDetails">
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <p>{blog.user.name}</p>
          {blog.user.id === user.id && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
