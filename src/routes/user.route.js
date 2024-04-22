import { Router } from "express";
import {getAllBlogs} from "../controllers/blog.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { wrapper } from "../utils/index.js";

const userRoute = Router();

userRoute.get("/me/blogs", isAuthenticated, wrapper(getAllBlogs));

export default userRoute;

