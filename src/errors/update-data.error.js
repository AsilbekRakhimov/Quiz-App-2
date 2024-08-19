export class UpdateDataError extends Error{
    constructor(message){
        super()
        this.name = "Update data error"
        this.message = message
        this.status = 400
    }
}