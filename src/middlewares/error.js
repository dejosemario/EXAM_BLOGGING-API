const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const success = err.success || false;
  const message = err.message || "Something went wrong";  

  const cleanedMessage = message.replace(/"/g, "");
  res.status(status).json({ success, message: cleanedMessage });
};

export { errorHandler };
