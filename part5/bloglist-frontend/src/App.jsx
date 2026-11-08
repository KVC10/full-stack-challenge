import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [createFormVisible, setCreateFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken(null);
  };

  const handleCreateNewBlog = async (e, blog) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create(blog);
      setBlogs([...blogs, newBlog]);
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      setLoginVisible(false);
    } catch (err) {
      console.log(err.message);
      err.response?.status === 401 &&
        setErrorMessage("you're not allowed, please login");
      err.response?.status === 400 &&
        setErrorMessage("title and url are required");
      err.response?.status === 500 && setErrorMessage("internal server error");

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      };
      const updatedBlogResponse = await blogService.update(
        blog.id,
        updatedBlog,
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === blog.id ? updatedBlogResponse : b)),
      );
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  console.log("blogs: ", blogs);
  console.log("user: ", user);

  return (
    <div>
      {errorMessage && (
        <p
          style={{
            border: "solid 1px red",
            borderRadius: "5px",
            backgroundColor: "lightgray",
          }}
        >
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p
          style={{
            border: "solid 1px green",
            borderRadius: "5",
            backgroundColor: "lightgray",
          }}
        >
          {successMessage}
        </p>
      )}

      {!user && (
        <LoginForm
          username={userName}
          password={password}
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          setUserName={setUserName}
          setPassword={setPassword}
          setSuccessMessage={setSuccessMessage}
          loginVisible={loginVisible}
          setLoginVisible={setLoginVisible}
        />
      )}
      <h2>blogs</h2>
      {user && (
        <div>
          Welcome, {user.name}!<button onClick={handleLogout}>logout</button>
        </div>
      )}

      <CreateBlogForm
        createFormVisible={createFormVisible}
        setCreateFormVisible={setCreateFormVisible}
        handleCreateNewBlog={handleCreateNewBlog}
      />

      {user && blogs.length > 0 && (
        <div>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              user={user}
              handleLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
