export const CheckRolesGuard = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.role)) {
            next();
            return;
        }
        res.status(405).send({
            message:"Kirish taqiqlangan"
        })
    }
}