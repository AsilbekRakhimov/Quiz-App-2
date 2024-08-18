export const ErrorHandlerMiddleware = (err, _, res, __) => {
    if (err.isError == true) {
        res.status(409).send({
            name:err.name,
            message:err.message
        });
        return;
    }
    res.status(500).send({
        name:err.name,
        message:"Server bilan bog'liq xatolik"
    })
}