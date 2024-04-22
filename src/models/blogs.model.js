import mongoose from "mongoose";
import { getReadingTime } from "../utils/index.js";


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, blog) {
        delete blog.__v;
      },
    },
  }
);


// calculate reading time before saving document
blogSchema.pre(/^(updateOne|save|findOneAndUpdate)/, function (next) {
  if (this.body) {
    this.reading_time = getReadingTime(this.body);
  }
  next();
});


//  Text index setup to optimize search
blogSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
