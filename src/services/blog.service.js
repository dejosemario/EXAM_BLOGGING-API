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
    { new: true },
  ).populate("author");
  if (!blog) throw new Error("Not Authorized to update blog");
  return blog;
};

export { createBlog, updateBlog };
