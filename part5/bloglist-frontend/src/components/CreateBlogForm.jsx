import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({
  handleCreateNewBlog,
  createFormVisible,
  setCreateFormVisible,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const hideWhenVisible = { display: createFormVisible ? "none" : "" };
  const showWhenVisible = { display: createFormVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateFormVisible(true)}>
          create a new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={(e) => handleCreateNewBlog(e, { title, author, url })}>
          <div>
            <label>
              title:{" "}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author:{" "}
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url:{" "}
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setCreateFormVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

export default CreateBlogForm;
