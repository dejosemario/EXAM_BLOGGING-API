import * as authService from "../services/auth.service.js";
import { loginSchema, signupSchema } from "../middlewares/validators.schema.js";
import { validate } from "../utils/index.js";

const signUp = async (req, res) => {
  validate(signupSchema, req.body);
  const user = await authService.createUser(req.body);
  if (user) {
    res
      .status(201)
      .json({ sucess: true, message: "User created successfully", data: user });
  }
};

const login = async (req, res) => {
  validate(loginSchema, req.body);
    const { email, password } = req.body;
  const userData = await authService.login(email, password);
  if (userData) {
    res
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        data: userData,
      });
  }
};

export { signUp, login };
