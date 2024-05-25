import User from "../models/users.model.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/index.js";

const createUser = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("User already exist");
  }
  const hashedPassword = await hashPassword(data.password);
  const newUser = new User({ ...data, password: hashedPassword });
  await newUser.save();
  return newUser;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  //generate the access token
  const token = generateToken({
    id: user._id,
    first_name: user.first_name,
  });

  return { user: user.toJSON(), token };
};

export { createUser, login };
