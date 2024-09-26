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

  // get all sub categories
  async getAllSubCategories(language) {
    try {
      const data = await this.#_sub_category
        .find()
        .populate("quiz", `_id title_${language} minPassScore questions`)
        .select(`_id name_${language} description_${language} categoryId quiz`);
      let obj = {};
      const sub_category = [];
      for (let i = 0; i < data.length; i++) {
        obj["id"] = data[i]._id;
        obj["name"] = data[i][`name_${language}`];
        obj["description"] = data[i][`description_${language}`];
        obj["categoryId"] = data[i].categoryId;
        obj["quiz"] = [];
        for (let j = 0; j < data[i]["quiz"].length; j++) {
          let obj1 = {};
          obj1["id"] = data[i]["quiz"][j]._id;
          obj1["title"] = data[i]["quiz"][j][`title_${language}`];
          obj1["minPassScore"] = data[i]["quiz"][j].minPassScore;
          obj1["questions"] = data[i]["quiz"][j].questions;
          obj["quiz"].push(obj1);
        }
        sub_category.push(obj);
        obj = {};
      }
      return sub_category;
    } catch (error) {
      throw new GetDataError(
        "Error in service while gettin all sub categories"
      );
    }
  }

  // get one category
  async getOneSubCategory(language, id) {
    try {
      const data = await this.#_sub_category
        .findById(id)
        .populate("quiz", `_id title_${language} minPassScore questions`)
        .select(`_id name_${language} description_${language} categoryId quiz`);

      let obj = {};
      const sub_category = [];
      obj["id"] = data._id;
      obj["name"] = data[`name_${language}`];
      obj["description"] = data[`description_${language}`];
      obj["categoryId"] = data.categoryId;
      obj["quiz"] = [];
      for (let j = 0; j < data["quiz"].length; j++) {
        let obj1 = {};
        obj1["id"] = data["quiz"][j]._id;
        obj1["title"] = data["quiz"][j][`title_${language}`];
        obj1["minPassScore"] = data["quiz"][j].minPassScore;
        obj1["questions"] = data["quiz"][j].questions;
        obj["quiz"].push(obj1);
      }
      sub_category.push(obj);

      return sub_category;
    } catch (error) {
      throw new GetDataError("Error in service while getting one sub category");
    }
  }

  // update sub category
  async updateOneSubCategory({
    name_uz,
    name_ru,
    name_en,
    description_en,
    description_ru,
    description_uz,
    id,
  }) {
    try {
      const data = await this.#_sub_category.findByIdAndUpdate(id, {
        name_uz,
        name_ru,
        name_en,
        description_en,
        description_ru,
        description_uz,
      });
      return data;
    } catch (error) {
      throw UpdateDataError("Error in service while updating sub category");
    }
  }

  // delete sub-category
  async deleteOneSubCategory(id) {
    try {
      const data = await this.#_sub_category.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new DeleteDataError("Error in service while deleting sub-category");
    }
  }
}

export default new SubCategoryService();
