

const logger = (req, res, next) => {
    const url = req.url, method = req.method;
    console.log(`URL ::   ${url} with METHOD :: ${method}`);
    next();
}


exports.log = logger;