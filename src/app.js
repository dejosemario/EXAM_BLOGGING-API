import express from "express";
// import * as routes from "./routes";
// import * as errorMiddleware from "./middlewares/error.js";

// Create a new express application
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Error handling middleware
// app.use(errorHandler);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({
      success: "false",
      message: `Can't find ${req.originalUrl} on this server!`,
    });
});

export default app;
