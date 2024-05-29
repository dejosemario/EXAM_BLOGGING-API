import"express-async-errors";
import express from "express";

import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route..js";
import userRoute from "./routes/user.route.js";
import { errorHandler } from "./middlewares/error.js";
import logger from "./config/Logger.js";
import middlewareLogger from "./middlewares/middlewareLogger.js";

// Create a new express application
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());
app.use(middlewareLogger);

//Routes
app.use("/api/auth", authRoute);
app.use("/api/blogs", blogRoute);
app.use('/api/users', userRoute);


app.use(errorHandler);


// Error handling middleware
app.all("*", (req, res) => {
  logger.error('Error', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    status: res.status,
    user: req.user ? req.user.id : 'Guest',
  });
  res.status(404).json({
    success: "false",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});


export default app;
