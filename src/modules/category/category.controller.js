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

    // get one category
    getCategory = async (req, res) => {
        try {
            const language = req.headers["accept-language"];
            const id = req.params.id
            const data = await this.#_service.getOneCategory(language, id);
            if (data) {
                res.status(200).send({
                    data:data,
                    message:"One category"
                });
                return ;
            }
            res.status(404).send({
                message:"Data is not found"
            })
        } catch (error) {
            res.status(409).send({
                name:error.name,
                message:"Error in get one category"
            })
        }
    }
    // get one category

    // update category
    updateCategory = async (req, res) => {
        try {
            const id = req.params.id
            const image = req?.file?.filename
            const data = await this.#_service.updateOneCategory({...req.body, image, id});
            if (!data) {
                res.status(404).send({
                    message:"Category is not found"
                });
                return;
            }
            res.status(200).send({
                message:"Category is updated"
            })
        } catch (error) {
            res.status(400).send({
                name:error.name,
                message:error.message
            })
        }
    }
    // update category

    // delete category
    deleteCategory = async (req, res) => {
        try {
            const data = await this.#_service.deleteOneCategory(req.params.id);
            if (data) {
                res.status(200).send({
                    message:"Category is deleted"
                });
                return;
            }
            res.status(404).send({
                message:"Category is not found"
            })
        } catch (error) {
            res.status(400).send({
                name:error.name,
                message:error.message
            })
        }
    }
    // delete category


}

export default new CategoryController()