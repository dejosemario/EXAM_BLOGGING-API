import * as blogService from '../services/blog.service.js';
import { updateBlogSchema, createBlogSchema, queryParamSchema} from '../middlewares/validators.schema.js';
import { validate } from '../utils/index.js';

const createBlog = async(req, res) =>{
    validate(createBlogSchema, req.body);
    const blog = await blogService.createBlog(req.user.id, req.body);
    if(blog){
        res.status(201).json({success: true, message: "Blog created successfully", data: blog});
    }
}

export { createBlog };