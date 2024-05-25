import logger from "../config/Logger.js";

//
const requestLogger = (req, res, next) => {
  res.on('finish', () => {
    logger.info('HTTP Request', {
      method: req.method,
      ip: req.ip,
      url: req.originalUrl,
      status: res.statusCode,
      user: req.user ? req.user.id : 'Guest',
    });
  });

  next();
};

export default requestLogger;
