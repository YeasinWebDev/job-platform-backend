const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API NOT FOUND!',
        error: {
            path: req.originalUrl,
            message: 'Your requested path is not found!',
        },
    });
};
export default notFound;
//# sourceMappingURL=notFound.js.map