import categoryService from "./category.service.js"

class CategoryController{
    #_service
    constructor(){
        this.#_service = categoryService
    }

    // create category
    createCategory = async(req, res) => {
        try {
            const image = req.file.filename
            const category = await this.#_service.createOneCategory({...req.body, image});
            res.status(201).send({
                data:category,
                message:"Category created"
            }) 
        } catch (error) {
            res.status(400).send({
                name:error.name,
                message:error.message
            })
        }
    }
    // create category
}

export default new CategoryController()