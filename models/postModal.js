const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide a Post name"],
      minlength: [8, "Post name must have more or equal then 8 character"],
      maxlength: [18, "A Post name must have less or equal then 14 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Provide a Post description"],
      minlength: [50, "A Post must have atleast 50 characters"],
      trim: true,
    },
    image: {
      type: String,
      default: "default.jpeg",
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// postSchema.pre('remove', async function(next){
//     const user = this
//     await Post.deleteMany(user)
// })

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
