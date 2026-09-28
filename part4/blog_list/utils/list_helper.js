const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite;
  });
};

const mostBlogs = (blogs) => {
  return blogs.reduce(
    (most, blog) => {
      const authorBlogs = blogs.filter((b) => b.author === blog.author);
      return authorBlogs.length > most.blogs
        ? { author: blog.author, blogs: authorBlogs.length }
        : most;
    },
    { author: null, blogs: 0 },
  );
};

const mostLikes = (blogs) => {
  return blogs.reduce(
    (most, blog) => {
      return blog.likes > most.likes
        ? { author: blog.author, likes: blog.likes }
        : most;
    },
    { author: null, likes: 0 },
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
