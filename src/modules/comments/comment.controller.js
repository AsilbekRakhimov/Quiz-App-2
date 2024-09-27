import commentService from "./comment.service.js";

class CommentController {
  #_service;
  constructor() {
    this.#_service = commentService;
  }

  // create comment
  createComment = async (req, res, next) => {
    try {
      const data = await this.#_service.createOneComment(req.body);
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

  // get all comments
  getComments = async (req, res, next) => {
    try {
      const data = await this.#_service.getAllComments(
        req.headers["accept-language"]
      );
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

  // get one comment
  getComment = async (req, res, next) => {
    try {
      const id = req.params.id;
      const language = req.headers["accept-language"];
      const data = await this.#_service.getOneComment(id, language);
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

  // update one comment
  updateComment = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await this.#_service.updateOneCommment({ id, ...req.body });
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

  // delete one comment
  deleteComment = async (req, res, next) => {
    try {
      const data = await this.#_service.deleteOneComment(req.params.id);
      if (!data) {
        res.status(404).send({
          message: "Comment is not found",
        });
        return;
      }
      res.status(200).send({
        message: "Comment is deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new CommentController();
