import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // to remove password when object is serialized.
      transform: function (doc, user) {
        delete user.__v;
        delete user.password;
        return user;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
