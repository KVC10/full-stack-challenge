const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Html is easy",
    author: "John Doe",
    url: "https://example.com",
    likes: 5,
  },
  {
    title: "Browser can execute only JavaScript",
    author: "Jane Smith",
    url: "https://another-example.com",
    likes: 10,
  },
];

/* beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
}) */

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test.only("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const hasIdProperty = response.body[0].hasOwnProperty("id");
  assert.strictEqual(hasIdProperty, true);
});

test.only("add a new blog post", async () => {
  const newBlog = {
    title: "New Blog Post",
    author: "Alice Johnson",
    url: "https://new-blog.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length + 1);
});

test.only("if likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "Blog Without Likes",
    author: "Bob Wilson",
    url: "https://blog-without-likes.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert.strictEqual(response.body[response.body.length - 1].likes, 0);
});

test.only("if title and url properties are missing, respond with 400 Bad Request", async () => {
  const newBlog = {
    author: "Alice Johnson",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test.only("delete a blog post", async () => {
  const response = await api.get("/api/blogs");
  const blogToDelete = response.body[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
});

test.only("update blog post", async () => {
  const res = await api.get("/api/blogs");
  const blogToUpdate = res.body[0];
  const newBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);
});

/* beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialNotes[0]);
  await blogObject.save();
  blogObject = new Blog(initialNotes[1]);
  await blogObject.save();
});


test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, 2);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("HTML is easy"), true);
});
 */
after(async () => {
  await mongoose.connection.close();
});
