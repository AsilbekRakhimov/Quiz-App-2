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

    // get all categories
    getCategories = async (req,res) => {
        try {
            const language = req.headers["accept-language"];
            const data = await this.#_service.getAllCategories(language);
            if (data) {
                res.status(200).send({
                    data:data,
                    message:"All categories"
                });
                return ;
            }
            res.status(404).send({
                message:"Categories are not found"
            })
        } catch (error) {
            res.status(400).send({
                name:error.name,
                message:"Error in get all categories"
            })
        }
    }
    // get all categories

}

export default new CategoryController()