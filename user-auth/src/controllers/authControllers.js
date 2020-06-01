var tokenService = require('./../services/tokenService');

login = (req, res, next) => {
    // console.log(req);
    // console.log(res);
    let email = "email";
    let id = "123";
    let role = "testRole"

    res.status(200)
        .send(createResponse(email, id, role))
};

createResponse = (email, id, role) => {
    
    const response = {};
    response.message = "authenticated Successfully!",
    response.tokens = tokenService.createTokens(email, id, role)
    return response
}

exports.login = login
