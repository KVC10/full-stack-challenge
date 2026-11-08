import React from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({
  username,
  password,
  setUser,
  setUserName,
  setPassword,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setSuccessMessage("login successful");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setUserName("");
      setPassword("");
    } catch (err) {
      console.log(err);
      setErrorMessage("wrong credentials");

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h1>log in to application</h1>

      <form action="" onSubmit={handleLogin}>
        <div>
          <label>
            username:{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />{" "}
          </label>
        </div>
        <div>
          <label>
            password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
