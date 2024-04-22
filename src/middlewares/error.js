import logger from "../config/Logger.js"

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const success = err.success || false;
  const message = err.message || "Something went wrong";

  // Log the error
  logger.error(message, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    status: err.status,
    user: req.user ? req.user.id : "Guest",
    stack: err.stack,
  });

  const cleanedMessage = message.replace(/"/g, "");
  res.status(status).json({ success, message: cleanedMessage });
};

export { errorHandler };
