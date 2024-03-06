export const logRequestMiddleware = async (req, res, next) => {
    console.log(req.url);
    next();
};
export const logErrorRequestMiddleware = async (error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
};
