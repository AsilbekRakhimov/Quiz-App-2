import { BaseError } from "./base.error.js";

export class ValidationError extends BaseError {
  constructor(message) {
    this.isError = true;
    this.message = message;
    this.name = "Validation error";
    this.status = 409;
  }
}
