import Blog from "../models/blogs.model.js";

const createBlogService = async (userId, data) => {
  try {
    const newBlog = await new Blog({ ...data, author: userId }).populate(
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

const getAllBlogsService = async ({
  order,
  order_by,
  page,
  limit,
  state,
  authorId,
}) => {
  const query = { author: authorId };
  const skipg = (page - 1) * limit;

  if (state) query.state = state;
  const blogs = await Blog.find(query)
    .populate("author")
    .sort([[order_by, order]])
    .skip(skip)
    .limit(limit);

  const allCount = await Blog.countDocuments(query);
  return { blogs, allCount };
};

const getBlogByIdService = async (id) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: id, $state: "published" },
    { $inc: { read_count: 1 } },
    { new: true }
  ).populate("author");
  if (!blog) {
    throw new Error("Blog not found or haven't been published", 404);
  }
  return blog;
};

const updateBlogService = async ({ id, userId, data }) => {
  const blogExits = await Blog.findById(id);
  if (!blogExits) {
    throw new Error("Blog not found", 404);
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: id, author: userId },
    { $set: data },
    { new: true }
  ).populate("author");

  return blog;
};

const publishBlogService = async (blogId, authorId) => {
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

const deleteBlogService = async (blogId, authorId) => {
  const blogExists = await Blog.findById(blogId);
  if (!blogExists) throw new Error("Blog not found");

  const blog = await Blog.findOneAndDelete({
    _id: blogId,
    author: authorId,
  }).populate("author");
  if (!blog) throw new Error("You are not authorized to delete blog");

  return blog;
};

export {
  createBlogService,
  updateBlogService,
  deleteBlogService,
  publishBlogService,
  getBlogByIdService,
  getAllBlogsService,
};
