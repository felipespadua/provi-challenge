const express = require('express');
const router  = express.Router();
const userController = require('../controllers/user')
const verifyJWT = require("../middlewares/verifyJWT");
const verifyPath = require("../middlewares/verifyPath");

router.post("/signup", userController.register);

router.post("/cpf", verifyJWT, verifyPath, userController.validate('register_cpf'), userController.register_cpf);

router.post("/full-name", verifyJWT, verifyPath, userController.validate('register_full_name'), userController.register_full_name);

router.post("/birthday", verifyJWT, verifyPath, userController.validate('register_birthday'), userController.register_birthday);

router.post("/phone-number", verifyJWT, verifyPath, userController.validate('register_phone_number'), userController.register_phone_number);

router.post("/address", verifyJWT, verifyPath, userController.validate('register_address'), userController.register_address);

router.post("/amount-requested", verifyJWT, verifyPath, userController.validate('register_amount_requested'), userController.register_amount_requested);

module.exports = router;
