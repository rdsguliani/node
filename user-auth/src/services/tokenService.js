

var jwt = require('jsonwebtoken');
var SECRET = "somesupersecretkeyToGenereateTheTokensAlsoUsed"

function createTokens(email, id, role) {

    const token = jwt.sign({
        email,
        userId: id,
    }, SECRET, { expiresIn: '1h' } )
    
    const accessToken = jwt.sign({
        email,
        role
    }, SECRET, { expiresIn: '1h' })

    return {token, accessToken}

}

exports.createTokens = createTokens
