import { CreateError } from "../../errors/create.error.js";
import { category } from "./category.schema.js";

class CategoryService {
  #_model;
  constructor() {
    this.#_model = category;
  }

  // create category
  async createOneCategory({ name_uz, name_ru, name_en,description_uz,description_ru,description_en, image }) {
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
}

export default new CategoryService();
