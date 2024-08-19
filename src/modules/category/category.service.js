import { CreateError } from "../../errors/create.error.js";
import { DeleteDataError } from "../../errors/delete-data.error.js";
import { GetDataError } from "../../errors/get-data.error.js";
import { UpdateDataError } from "../../errors/update-data.error.js";
import { category } from "./category.schema.js";
import fs from 'fs';
import path from "path";

class CategoryService {
  #_model;
  constructor() {
    this.#_model = category;
  }

  // create category
  async createOneCategory({
    name_uz,
    name_ru,
    name_en,
    description_uz,
    description_ru,
    description_en,
    image,
  }) {
    try {
      const category = await this.#_model.insertMany({
        name_uz,
        name_ru,
        name_en,
        description_uz,
        description_ru,
        description_en,
        image,
      });
      return category;
    } catch (error) {
      throw new CreateError("Error in service while creating category");
    }
  }
  // create category

  // get all categories
  async getAllCategories(language) {
    try {
      if (language == "uzbek") {
        const data = await this.#_model
          .find().populate("sub_categories", "name_uz description_uz")
          .select("name_uz description_uz image sub_categories");
        return data;
      }
      if (language == "english") {
        const data = await this.#_model
          .find().populate("sub_categories", "name_en description_en")
          .select("name_en description_en image sub_categories");
        return data;
      }
      if (language == "russian") {
        const data = await this.#_model
          .find().populate("sub_categories", "name_ru description_ru")
          .select("name_ru description_ru image sub_categories");
        return data;
      }
      return null;
    } catch (error) {
      throw new GetDataError("Error in service while getting all categories");
    }
  }
  // get all categories

  // get one category
  async getOneCategory(language, id) {
    try {
      if (language == "uzbek") {
        const data = await this.#_model
          .findById(id).populate("sub_categories", "name_uz description_uz")
          .select("name_uz description_uz image sub_categories");
        return data;
      }
      if (language == "english") {
        const data = await this.#_model
          .findById(id).populate("sub_categories", "name_en description_en")
          .select("name_en description_en image sub_categories");
        return data;
      }
      if (language == "russian") {
        const data = await this.#_model
          .findById(id).populate("sub_categories", "name_ru description_ru")
          .select("name_ru description_ru image sub_categories");
        return data;
      }
      return null;
    } catch (error) {
      throw new GetDataError("Error in service while getting one category");
    }
  }
  // get one category

  // update one category
  async updateOneCategory({
    name_uz,
    name_ru,
    name_en,
    description_en,
    description_ru,
    description_uz,
    image,
    id,
  }) {
    try {
      const category = await this.#_model.findById(id);
      if (!category) {
        return null
      }
      if (image) {
        fs.unlink(path.join(process.cwd(), "uploads", category?.image), (err) => {
            if (err) {
              throw err;
            }
          });
      }
      const data = await this.#_model.findByIdAndUpdate(id, {
        name_uz: name_uz,
        name_en: name_en,
        name_ru: name_ru,
        description_en: description_en,
        description_ru: description_ru,
        description_uz: description_uz,
        image: image,
      });
      return data;
    } catch (error) {
      throw new UpdateDataError("Error in service while updating category");
    }
  }
  // update one category

  // delete category 
  async deleteOneCategory(id){
    try {
        const data = await this.#_model.findByIdAndDelete(id);
        return data;
    } catch (error) {
        throw new DeleteDataError("Error in service while deleting category")
    }
  }
  // delete category 
}

export default new CategoryService();
