import { BaseError } from "./base.error.js";

export class CreateError extends BaseError{
    constructor(message){
        super()
        this.message = message
        this.name = "Create error"
        this.status = 400
    }
}