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

export { createBlog};