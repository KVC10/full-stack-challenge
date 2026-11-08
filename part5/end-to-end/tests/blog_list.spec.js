const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "jhondoe",
        username: "jhondoe",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
  });

  describe("login", () => {
    test("user can log in", async ({ page }) => {
      /* await page.getByRole("textbox").first().fill("mluukkai");
    await page.getByRole("textbox").last().fill("salainen"); */
      /* const textboxes = await page.getByRole("textbox").all();
    await textboxes[0].fill("mluukkai");
    await textboxes[1].fill("salainen"); */
      await page.getByLabel("username").fill("jhon doe");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Welcome jhon doe")).toBeVisible();
    });

    //First argument must use the object destructuring pattern: "username"
    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("jhon doe");
      await page.getByLabel("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("jhon doe");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog post can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create a new blog" }).click();
      await page.getByLabel("title").fill("new blog post");
      await page.getByLabel("author").fill("jhon doe");
      await page.getByLabel("url").fill("https://new-blog-post.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText("new blog post jhon doe")).toBeVisible();
    });
  });
});

/* describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "save" }).click();
      await expect(
        page.getByText("a note created by playwright"),
      ).toBeVisible();
    });
  }); */
