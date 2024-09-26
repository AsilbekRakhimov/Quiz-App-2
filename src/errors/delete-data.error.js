import { BaseError } from "./base.error.js";

export class DeleteDataError extends BaseError {
  constructor(message) {
    super();
    this.message = message;
    this.name = "Error in delete data";
    this.status = 400;
  }
}
