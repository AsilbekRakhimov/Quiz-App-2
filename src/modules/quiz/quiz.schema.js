import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title_uz: {
      type: String,
      required: true,
      unique: false,
    },
    title_ru: {
      type: String,
      required: true,
      unique: false,
    },
    title_en: {
      type: String,
      required: true,
      unique: false,
    },
    minPassScore: {
      type: String,
      required: true,
      default: 5,
    },
    questions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "questions",
      },
    ],
    subCategoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sub_categories",
    },
  },
  {
    _id: true,
    timestamps: true,
    collection: "quiz",
  }
);

export const quiz = mongoose.model("quiz", quizSchema);
