var controller = require('./../controllers/authControllers');

var router = require('express').Router();


// console.log(authControllers);
router.get("/v1/authenticate", controller.login);



module.exports = router;