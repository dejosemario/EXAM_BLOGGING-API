import { verifyToken } from "../utils/index.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authorization.split(" ")[1];
    const decode = await verifyToken(token);
    if (!req.user) req.user = {}; //set a user object to empty object if it doesn't exist
    req.user.id = decode.id;
    next();
  } catch (error) {
    next(error); //pass the error to the error handling middleware
  }
};
