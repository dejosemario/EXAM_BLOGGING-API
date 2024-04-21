import Blog from "../models/blogs.model.js";

const createBlog = async (userId, data) => {
  try {
    const newBlog = await new Blog({ ...data, user: userId }).populate(
      "author"
    );
    await newBlog.save();
    return newBlog;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Blog already exist");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const updateBlog = async (blogId, authorId, data) => {
  const blogExits = await Blog.findById(blogId);
  if (!blogExits) {
    throw new Error("Blog not found");
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, author: authorId },
    { $set: data },
    { new: true }
  ).populate("author");
  if (!blog) throw new Error("You are not Authorized to update blog");
  return blog;
};

const deleteBlog = async (blogId, authorId) => {
  const blogExists = await Blog.findById(blogId);
  if (!blogExists) throw new Error("Blog not found");

  const blog = await Blog.findOneAndDelete({
    _id: blogId,
    author: authorId,
  }).populate("author");
  if (!blog) throw new Error("You are not authorized to delete blog");

  return blog;
};

const publishBlog = async (blogId, authorId) => {
  const blogExists = await Blog.findById(blogId);
  if (!blogExists) throw new Error("Blog not found");

  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, author: authorId },
    { $set: { state: "published" } },
    { new: true }
  ).populate("author");

  if (!blog) throw new Error("You are not authorized to publish blog");
  return blog;
};

export { createBlog, updateBlog, deleteBlog, publishBlog };
