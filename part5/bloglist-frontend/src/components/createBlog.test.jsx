import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

describe("CreateBlogForm component", () => {
  test("calls the createBlog handler with the right details when the form is submitted", async () => {
    const user = userEvent.setup();
    const mockCreateBlog = vi.fn();

    render(
      <CreateBlogForm
        handleCreateNewBlog={mockCreateBlog}
        loginVisible={true}
        setLoginVisible={vi.fn()}
      />,
    );

    await user.type(screen.getByLabelText(/title/i), "My new blog");
    await user.type(screen.getByLabelText(/author/i), "Jane Doe");
    await user.type(screen.getByLabelText(/url/i), "https://my-blog.com");
    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(mockCreateBlog).toHaveBeenCalledTimes(1);
    expect(mockCreateBlog).toHaveBeenCalledWith(expect.anything(), {
      title: "My new blog",
      author: "Jane Doe",
      url: "https://my-blog.com",
    });
  });
});
