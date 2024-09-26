import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
      unique: false,
    },
    attemptTimes: {
      type: Number,
      required: false,
      unique: false,
    },
    attemptDate: {
      type: String,
      required: false,
      default: new Date(),
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    quizId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "quiz",
    },
  },
  {
    _id: true,
    collection: "results",
    timestamps: true,
  }
);

export const Result = mongoose.model("results", resultSchema);
