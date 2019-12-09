const express = require('express');
const router  = express.Router();
const userController = require('../controllers/user')


router.post("/signup", userController.register);

router.post("/cpf", userController.register_cpf);

router.post("/full-name", userController.register_full_name);

router.post("/birthday", userController.register_birthday);

router.post("/phone-number", userController.register_phone_number);

router.post("/address", userController.register_address);

module.exports = router;
