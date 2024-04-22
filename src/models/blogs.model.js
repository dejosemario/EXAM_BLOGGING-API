import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
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
blogSchema.pre('save', function (next) {
	let blog = this
  
	// do nothing if the article body is unchanged
	if (!blog.isModified('body')) return next()
  
	// calculate the time in minutes
	const timeToRead = readingTime(this.body)
  
	blog.reading_time = timeToRead
	next()
  })

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
