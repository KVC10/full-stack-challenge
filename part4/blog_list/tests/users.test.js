const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");

const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
});

test.only("user with a valid username and password can be created", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
    password: "secret",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

test.only("user with a short username cannot be created", async () => {
  const newUser = {
    username: "ab",
    name: "Short Username",
    password: "secret",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test.only("user with a short password cannot be created", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
    password: "ab",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});
