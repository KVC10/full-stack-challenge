const mongoose = require("mongoose");
const mongoUrl = require("../utils/config").MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    console.log("connected to MongoDB");
    console.log(mongoUrl);
  })
  .catch((error) => {
    console.log(mongoUrl);
    console.log("error connecting to MongoDB:", error.message);
  });

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
