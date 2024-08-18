import { CreateError } from "../../errors/create.error.js";
import { GetDataError } from "../../errors/get-data.error.js";
import { category } from "./category.schema.js";

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
          .find()
          .select("name_uz description_uz image sub_categories");
        return data;
      }
      if (language == "english") {
        const data = await this.#_model
          .find()
          .select("name_en description_en image sub_categories");
        return data;
      }
      if (language == "russian") {
        const data = await this.#_model
          .find()
          .select("name_ru description_ru image sub_categories");
        return data;
      }
      return null
    } catch (error) {
      throw new GetDataError("Error in service while getting all categories");
    }
  }
  // get all categories
}

export default new CategoryService();
