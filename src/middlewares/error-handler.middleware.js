export const ErrorHandlerMiddleware = (err, req, res, next) => {
    if (err.isError) {
        res.status(409).send({
            name:err.name,
            message:err.message
        })
    }

    res.status(500).send({
        name:err.name,
        message:"Server bilan bog'liq xatolik"
    })
}