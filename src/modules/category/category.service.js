import { CreateError } from "../../errors/create.error.js";
import { DeleteDataError } from "../../errors/delete-data.error.js";
import { GetDataError } from "../../errors/get-data.error.js";
import { UpdateDataError } from "../../errors/update-data.error.js";
import { category } from "./category.schema.js";
import fs from "fs";
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

  // get all categories
  async getAllCategories(language) {
    try {
      const data = await this.#_model
        .find()
        .populate("sub_categories", `name_${language} description_${language}`)
        .select(
          `name_${language} description_${language} image sub_categories`
        );
      let obj = {};
      const category = [];
      for (let i = 0; i < data.length; i++) {
        obj["id"] = data[i]._id;
        obj["name"] = data[i]["name_" + language];
        obj["description"] = data[i][`description_${language}`];
        obj["image"] = data[i].image;
        obj["sub_categories"] = [];
        for (let j = 0; j < data[i]["sub_categories"].length; j++) {
          let obj1 = {};
          obj1["name"] = data[i]["sub_categories"][j][`name_${language}`];
          obj1["description"] =
            data[i]["sub_categories"][j][`description_${language}`];
          obj["sub_categories"].push(obj1);
          obj1 = {};
        }
        category.push(obj);
        obj = {};
      }
      return category;
    } catch (error) {
      throw new GetDataError("Error in service while getting all categories");
    }
  }

  // get one category
  async getOneCategory(language, id) {
    try {
      const data = await this.#_model
        .findById(id)
        .populate("sub_categories", `name_${language} description_${language}`)
        .select(
          `name_${language} description_${language} image sub_categories`
        );
      let obj = {};
      const category = [];
      obj["id"] = data._id;
      obj["name"] = data["name_" + language];
      obj["description"] = data[`description_${language}`];
      obj["image"] = data.image;
      obj["sub_categories"] = [];
      for (let j = 0; j < data["sub_categories"].length; j++) {
        let obj1 = {};
        obj1["name"] = data["sub_categories"][j][`name_${language}`];
        obj1["description"] =
          data["sub_categories"][j][`description_${language}`];
        obj["sub_categories"].push(obj1);
        obj1 = {};
      }
      category.push(obj);
      obj = {};
      return category;
    } catch (error) {
      throw new GetDataError("Error in service while getting one category");
    }
  }

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
        return null;
      }
      if (image) {
        fs.unlink(
          path.join(process.cwd(), "uploads", category?.image),
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
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

  // delete category
  async deleteOneCategory(id) {
    try {
      const data = await this.#_model.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new DeleteDataError("Error in service while deleting category");
    }
  }
}

export default new CategoryService();
