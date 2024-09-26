import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title_uz: {
      type: String,
      required: true,
      unique: false,
      minLength: 4,
    },
    title_ru: {
      type: String,
      required: true,
      unique: false,
      minLength: 4,
    },
    title_en: {
      type: String,
      required: true,
      unique: false,
      minLength: 4,
    },
    image: {
      type: String,
      required: false,
    },
    quizId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "quiz",
    },
    options: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"options"
      },
    ],
  },
  {
    _id: true,
    timestamps: true,
    collection: "questions",
  }
);

export const Question = mongoose.model("questions", questionSchema);
