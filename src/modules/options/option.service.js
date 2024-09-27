import { ConflictError } from "../../errors/conflict.error.js";
import { Option } from "./option.schema.js";

class OptionService {
  #_model;
  constructor() {
    this.#_model = Option;
  }

  // create option
  async createOneOption({
    option_uz,
    option_ru,
    option_en,
    isCorrect,
    questionId,
  }) {
    try {
      const data = await this.#_model.create({
        option_uz,
        option_ru,
        option_en,
        isCorrect,
        questionId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get options
  async getAllOptions(language) {
    try {
      const data = await this.#_model
        .find()
        .select(`_id option_${language} isCorrect questionId`);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // get one option
  async getOneOption(language, id) {
    try {
      const data = await this.#_model
        .findById(id)
        .select(`_id option_${language} isCorrect questionId`);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // update option
  async updateOneOption({
    id,
    option_uz,
    option_ru,
    option_en,
    isCorrect,
    questionId,
  }) {
    try {
      const data = await this.#_model.findByIdAndUpdate(id, {
        option_uz,
        option_ru,
        option_en,
        isCorrect,
        questionId,
      });
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }

  // delete option
  async deleteOneOption(id) {
    try {
      const data = await this.#_model.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new ConflictError(error.message);
    }
  }
}

export default new OptionService();
