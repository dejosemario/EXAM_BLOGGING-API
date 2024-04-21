import * as blogService from "../services/blog.service.js";
import {
  updateBlogSchema,
  createBlogSchema,
  paramIdSchema,
} from "../middlewares/validators.schema.js";
import { validate } from "../utils/index.js";

const createBlog = async (req, res) => {
  validate(createBlogSchema, req.body);
  const blog = await blogService.createBlog(req.user.id, req.body);
  if (blog) {
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  }
};

const updateBlog = async (req, res) => {
  const { id } = validate(paramIdSchema, req.params);
  validate(updateBlogSchema, req.body);
  const blog = await blogService.updateBlog(id, req.user.id, req.body);
  if (blog) {
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  }
};

export { createBlog, updateBlog };
