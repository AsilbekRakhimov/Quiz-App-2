import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment_uz: {
      type: String,
      required: true,
      unique: false,
    },
    comment_ru: {
      type: String,
      required: true,
      unique: false,
    },
    comment_en: {
      type: String,
      required: true,
      unique: false,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    questionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "questions",
    },
  },
  {
    _id: true,
    timestamps: true,
    collection: "comments",
  }
);

export const Comment = mongoose.model("comments", CommentSchema);
