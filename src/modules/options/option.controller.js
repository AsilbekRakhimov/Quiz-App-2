import optionService from "./option.service.js";

class OptionController {
  #_service;
  constructor() {
    this.#_service = optionService;
  }

  // create option
  createOption = async (req, res, next) => {
    try {
      const data = await this.#_service.createOneOption(req.body);
      if (!data) {
        res.status(400).send({
          message: "bad request",
        });
        return;
      }
      res.status(201).send({
        message: "created",
      });
    } catch (error) {
      next(error);
    }
  };

  // get options
  getOptions = async (req, res, next) => {
    try {
      const data = await this.#_service.getAllOptions(
        req.headers["accept-language"]
      );
      if (!data) {
        res.status(400).send({
          message: "bad request",
        });
        return;
      }
      res.status(200).send({
        message: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // get one option
  getOption = async (req, res, next) => {
    try {
      const id = req.params.id;
      const language = req.headers["accept-language"];
      const data = await this.#_service.getOneOption(language, id);
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // update option
  updateOption = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await this.#_service.updateOneOption({ id, ...req.body });
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "updated",
      });
    } catch (error) {
      next(error);
    }
  };

  // delete option
  deleteOption = async (req, res, next) => {
    try {
      const data = await this.#_service.deleteOneOption(req.params.id);
      if (!data) {
        res.status(404).send({
          message: "not found",
        });
        return;
      }
      res.status(200).send({
        message: "deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new OptionController();
