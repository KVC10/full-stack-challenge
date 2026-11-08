import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

/* import blogService from "../services/blogs"; */

vi.mock("../services/blogs");

describe("Blog component", () => {
  let mockHandleLike;
  beforeEach(() => {
    const blog = {
      title: "Test Blog Title",
      author: "Test Blog Author",
      url: "https://test-blog.com",
      likes: 5,
      user: { id: "user123", name: "Test User" },
    };
    const currentUser = { id: "user123", name: "Test User" };

    /* vi.clearAllMocks();
    blogService.update.mockResolvedValue({ ...blog, likes: 6 }); */
    mockHandleLike = vi.fn();
    render(
      <Blog
        blog={blog}
        user={currentUser}
        setBlogs={vi.fn()}
        handleLike={mockHandleLike}
      />,
    );
  });

  test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    expect(screen.getByText("Test Blog Title Test Blog Author")).toBeDefined();
    expect(screen.queryByText("https://test-blog.com")).toBeNull();
    expect(screen.queryByText(/likes/i)).toBeNull();
  });

  test("the blog's URL and number of likes are shown when the view button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /view/i });

    await user.click(button);

    expect(screen.getByText("https://test-blog.com")).toBeVisible();
    expect(screen.getByText(/likes/i)).toBeVisible();
  });

  test("if the like button is clicked twice, the event handler is called twice", async () => {
    const user = userEvent.setup();

    // 1. Ouvrir les détails pour faire apparaître le bouton like
    await user.click(screen.getByRole("button", { name: /view/i }));
    const likeButton = screen.getByRole("button", { name: /^like$/i });

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandleLike).toHaveBeenCalledTimes(2);
  });
});
