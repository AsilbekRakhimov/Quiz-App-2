import { Schema, SchemaTypes, model } from "mongoose";

const categorySchema = new Schema(
  {
    name_uz: {
      type: String,
      required: true,
      alias: "name",
    },
    name_ru: {
      type: String,
      required: true,
      alias: "name",
    },
    name_en: {
      type: String,
      required: true,
      alias: "name",
    },
    description_uz: {
      type: String,
    },
    description_ru: {
      type: String,
    },
    description_en: {
      type: String,
    },
    image: {
      type: String,
    },
    sub_categories: [
      {
        type: SchemaTypes.ObjectId,
        ref: "sub_category",
      },
    ],
  },
  {
    _id: true,
    timestamps: true,
    collection: "category",
  }
);

export const category = model("category", categorySchema);
