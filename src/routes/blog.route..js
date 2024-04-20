import { Router } from 'express';
import * as blogController from "../controllers/blog.controller.js";
import { wrapper } from "../utils/index.js";
import { isAuthenticated } from "../middlewares/auth.js";

const blogRoute = Router();

blogRoute.get('/', wrapper(blogController.getAllBlogs));
blogRoute.get('/:id', wrapper(blogController.getBlog));
blogRoute.post('/', isAuthenticated, wrapper(blogController.createBlog));
blogRoute.patch('/:id', isAuthenticated, wrapper(blogController.updateBlog));
blogRoute.patch('/:id/publish',isAuthenticated, wrapper(blogController.deleteBlog));
blogRoute.delete('/:id', isAuthenticated, wrapper(blogController.deleteBlog));

export default blogRoute;

