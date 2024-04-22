import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//This function is used to hatch password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

//This function is used to compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

//This function is used to generate token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

// This function is a wrapper for async functions to catch errors and pass them to the error handling middleware.
const wrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// This function is used to validate the request body against a schema.
const validate = (schema, data) => {
  if (schema) {
    const { value, error } = schema.validate(data);
    if (error) {
      const errorMessage = error.details[0].message;
      throw new Error(errorMessage);
    }
    return value;
  }
};

//check
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { wrapper, validate, verifyToken, hashPassword, comparePassword, generateToken};
