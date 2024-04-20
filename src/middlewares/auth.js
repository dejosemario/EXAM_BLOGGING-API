import { verifyToken } from "../utils";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authorization = req.header.authorization;
    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authorization.split(" ")[1];
    const decode = await verifyToken(token);
    if (!req.user) req.user = {}; //set a user object to empty object if it doesn't exist
    req.user = decode;
    next();
  } catch (error) {
    next(error); //pass the error to the error handling middleware
  }
};
