import { CreateError } from "../../errors/create.error.js";
import { DeleteDataError } from "../../errors/delete-data.error.js";
import { GetDataError } from "../../errors/get-data.error.js";
import { UpdateDataError } from "../../errors/update-data.error.js";
import { category } from "../category/category.schema.js";
import { sub_category } from "./sub_category.schema.js";

class SubCategoryService {
  #_sub_category;
  #_category;
  constructor() {
    this.#_sub_category = sub_category;
    this.#_category = category;
  }

  // create sub_category
  async createOneSubCategory({
    name_uz,
    name_ru,
    name_en,
    description_uz,
    description_ru,
    description_en,
    categoryId,
  }) {
    try {
      const data = await this.#_sub_category.insertMany({
        name_uz,
        name_ru,
        name_en,
        description_uz,
        description_ru,
        description_en,
        categoryId,
      });
      const category = await this.#_category.updateOne(
        { _id: categoryId },
        {
          $push: {
            sub_categories: data[0],
          },
        }
      );
      return data;
    } catch (error) {
      throw new CreateError("Error in service while creating subcategory");
    }
  }
  // create sub_category

  // get all sub categories
  async getAllSubCategories(language) {
    try {
      if (language == "uzbek") {
        const data = await this.#_sub_category
          .find()
          .select("name_uz description_uz quiz categoryId");
        return data;
      }
      if (language == "russian") {
        const data = await this.#_sub_category
          .find()
          .select("name_ru description_ru quiz categoryId");
        return data;
      }
      if (language == "english") {
        const data = await this.#_sub_category
          .find()
          .select("name_en description_en quiz categoryId");
        return data;
      }
      return null;
    } catch (error) {
      throw new GetDataError(
        "Error in service while gettin all sub categories"
      );
    }
  }
  // get all sub categories

  // get one cayegory
  async getOneSubCategory(language, id) {
    try {
      if (language == "uzbek") {
        const data = await this.#_sub_category
          .findById(id)
          .select("name_uz description_uz quiz categoryId");
        return data;
      }
      if (language == "russian") {
        const data = await this.#_sub_category
          .findById(id)
          .select("name_ru description_ru quiz categoryId");
        return data;
      }
      if (language == "english") {
        const data = await this.#_sub_category
          .findById(id)
          .select("name_en description_en quiz categoryId");
        return data;
      }
      return null;
    } catch (error) {
      throw new GetDataError("Error in service while getting one sub category");
    }
  }
  // get one cayegory

  // update sub category
  async updateOneSubCategory({
    name_uz,
    name_ru,
    name_en,
    description_en,
    description_ru,
    description_uz,
    id
  }) {
    try {
        const data = await this.#_sub_category.findByIdAndUpdate(id,{
            name_uz,
            name_ru,
            name_en,
            description_en,
            description_ru,
            description_uz, 
        })
        return data
    } catch (error) {
        throw UpdateDataError("Error in service while updating sub category")
    }
  }
  // update sub category

  // delete sub-category
  async deleteOneSubCategory(id){
    try {
        const data = await this.#_sub_category.findByIdAndDelete(id);
        return data;
    } catch (error) {
        throw new DeleteDataError("Error in service while deleting sub-category")
    }
  }
  // delete sub-category
}

export default new SubCategoryService();
