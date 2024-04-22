import express from "express";
import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route..js";
import userRoute from "./routes/user.route.js";
import { errorHandler } from "./middlewares/error.js";

// Create a new express application
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/blogs", blogRoute);
app.use('/api/users', userRoute);


// Error handling middleware
app.use(errorHandler);
app.all("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default app;
