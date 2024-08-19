import sub_categoryService from "./sub_category.service.js";

class SubCategoryController {
  #_service;
  constructor() {
    this.#_service = sub_categoryService;
  }

  // create on sub-category
  createSubCategory = async (req, res) => {
    try {
      const data = await this.#_service.createOneSubCategory(req.body);
      if (data) {
        res.status(201).send({
          data: data,
          message: "Succesfully created",
        });
        return;
      }
      res.status(409).send({
        message: "Error in creating sub category",
      });
    } catch (error) {
      res.status(400).send({
        name: error.name,
        message: error.message,
      });
    }
  };
  // create on sub-category

  // get all sub categories
  getSubCategories = async (req, res) => {
    try {
      const language = req.headers["accept-language"];
      const data = await this.#_service.getAllSubCategories(language);
      if (data) {
        res.status(200).send({
          data: data,
          message: "All categories",
        });
        return;
      }
      res.status(409).send({
        data: [],
        message: "Bad request error",
      });
    } catch (error) {
      res.status(400).send({
        name: error.name,
        message: error.message,
      });
    }
  };
  // get all sub categories

  // get one sub category
  getSubCategory = async (req, res) => {
    try {
      const language = req.headers["accept-language"];
      const id = req.params.id;
      const data = await this.#_service.getOneSubCategory(language, id);
      if (data) {
        res.status(200).send({
          data: data,
          message: "One category",
        });
        return;
      }
      res.status(404).send({
        data: [],
        message: "Sub-category is not found",
      });
    } catch (error) {
      res.status(400).send({
        name: error.name,
        message: error.message,
      });
    }
  };
  // get one sub category

  // update sub category
  updateSubCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await this.#_service.updateOneSubCategory({
        ...req.body,
        id,
      });
      if (data) {
        res.status(200).send({
          message: "Sub-category is updated",
        });
        return;
      }
      res.status(404).send({
        message: "Sub-category is not found",
      });
    } catch (error) {
      res.status(400).send({
        name: error.name,
        message: error.message + "  in update sub category",
      });
    }
  };
  // update sub category

  // delete sub category
  deleteSubCategory = async (req, res) => {
    try {
        const data = await this.#_service.deleteOneSubCategory(req.params.id);
        if (data) {
            res.status(200).send({
                message:"Sub category is deleted"
            });
            return;
        }
        res.status(404).send({
            message:"Sub category is not found"
        })
    } catch (error) {
      res.status(400).send({
        name: error.name,
        message: error.message + "  in delete sub-category",
      });
    }
  };
  // delete sub category
}

export default new SubCategoryController();
