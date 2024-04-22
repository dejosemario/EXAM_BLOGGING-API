import {
  createBlogService,
  updateBlogService,
  deleteBlogService,
  publishBlogService,
  getBlogByIdService,
  getAllPublishedBlogsService,
} from "../services/blog.service.js";
import {
  updateBlogSchema,
  createBlogSchema,
  paramIdSchema,
  queryParamSchema,
} from "../middlewares/validators.schema.js";
import { validate } from "../utils/index.js";

const createBlog = async (req, res) => {
  validate(createBlogSchema, req.body);
  const blog = await createBlogService(req.user.id, req.body);
  if (blog) {
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  }
};

const getBlog = async (req, res) => {
  const { id } = validate(paramIdSchema, req.params);
  console.log(id, "I am id");

  const data = await getBlogByIdService(id);
  if (data) {
    return res
      .status(200)
      .json({ success: true, message: "Successfully retrieved Blog", data });
  }
  throw new Error("Blog post not found", 404);
};

const getAllBlogs = async (req, res) => {
  const values = validate(queryParamSchema, req.query);
  const { order, order_by, page, limit } = values;

  const { state } = req.query; //check later

  // get the author id from the user object
  const authorId = req.user.id; //check later

  const { blogs, allCount } = await getAllBlogsService({
    order,
    order_by,
    page,
    limit,
    state,
    authorId,
  });
  const totalPages = Math.ceil(data.allCount / limit);

  const metaData = {
    page: page,
    limit: limit,
    allCount: allCount,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
  };

  return res.status(200).json({
    success: true,
    message: totalPages ? "Successfully retrieved all blogs" : "No blogs found",
    data: { blogs, allCount, totalPages },
    metaData,
  });
};

const getAllPublishedBlogs = async (req, res) => {
  const values = validate(queryParamSchema, req.query);
  console.log(values, "I am values");
  const { page, limit, order, order_by } = values;

  const { author, title, tags } = req.query;
  const searchParams = { author, title, tags };

  const { blogs, allCount } = await getAllPublishedBlogsService(
    page,
    limit,
    order,
    order_by,
    searchParams,
  );

  const totalPages = Math.ceil(allCount / limit);

  const metaData = {
    page: page,
    limit: limit,
    allCount: allCount,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
  };

  return res.status(200).json({
    success: true,
    message: totalPages ? "Successfully retrieved all blogs" : "No blogs found",
    data: { blogs, allCount, totalPages },
    metaData,
  });
};

const updateBlog = async (req, res) => {
  const { id } = validate(paramIdSchema, req.params);
  validate(updateBlogSchema, req.body);
  const blog = await updateBlogService({
    id,
    userId: req.user.id,
    data: req.body,
  });
  if (blog) {
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  }
};

const publishBlog = async (req, res) => {
  const { id } = validate(paramIdSchema, req.params);
  const blog = await publishBlogService(id, req.user.id);
  if (blog) {
    return res.status(200).json({
      success: true,
      message: " Blog published successfully",
      data: blog,
    });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = validate(paramIdSchema, req.params);
  const data = await deleteBlogService(id, req.user.id);
  if (data) {
    return res.status(204).json({ message: "Blog deleted successfully" });
  }
};

export {
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  getBlog,
  getAllBlogs,
  getAllPublishedBlogs,
};
