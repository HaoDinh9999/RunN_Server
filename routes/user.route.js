var express = require('express');
var authController = require('../controller/auth.controller');
var userController = require('../controller/user.controller')

var router = express.Router();

/* GET users listing. */

router
    .route('/signup')
    .post(authController.signup)

router
    .route('/login')
    .post(authController.login)

router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/:email/detail')
    .get(userController.getUserByEmail)
// router
//     .route('/')
//     .get(getAllTours),
//     .post(createTour);

// router
//     .route('/:id')
//     .get
//     .patch
//     .delete


module.exports = router;
