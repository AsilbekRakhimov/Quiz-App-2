import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    option_uz: {
      type: String,
      unique: false,
      required: true,
    },
    option_ru: {
      type: String,
      unique: false,
      required: true,
    },
    option_en: {
      type: String,
      unique: false,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    questionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "questions",
    },
  },
  {
    _id: true,
    timestamps: true,
    collection: "options",
  }
);

export const Option = mongoose.model("options", optionSchema);
