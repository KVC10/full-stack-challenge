const express = require("express");
require("dotenv").config();
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

const config = require("./utils/config");
const logger = require("./utils/logger");
const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).json({
      error: "expected `username` to be unique",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

app.use(errorHandler);

/* const PORT = 3003; */
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

/* s5hpvSLDEp0hkj7u;
 */
module.exports = app;
