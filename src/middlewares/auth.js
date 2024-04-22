import { verifyToken } from "../utils/index.js";

export const isAuthenticated = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new Error("No authorization header found");
    const token = authorization.split(" ")[1];
    const decode = verifyToken(token);
    if (!req.user) req.user = {}; //set a user object to empty object if it doesn't exist
    console.log(decode, " I am decode");
    req.user = decode;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token provided." });
  }
};
