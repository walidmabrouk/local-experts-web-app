const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    
    title: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    address: String,
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    category: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    price: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Populate Comment For This Post
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

const PostModel = mongoose.model("Post", postSchema);

//* Validate Create POst
function validateCreatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(10).required(),
    category: Joi.string().trim().required(),
  });
  const { error, value } = schema.validate(obj);
  return error || value;
}
//* Validate Update POst
function validateUpdatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200),
    description: Joi.string().trim().min(10),
    category: Joi.string().trim(),
  });
  const { error, value } = schema.validate(obj);
  return error || value;
}




module.exports = {
  PostModel,
  validateCreatePost,
  validateUpdatePost
};
