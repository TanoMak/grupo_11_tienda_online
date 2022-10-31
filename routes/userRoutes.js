const express = require("express");
const {body} = require("express-validator");

const router = express.Router();

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


//controlador
const userController = require("../controllers/userController");

//middlewares
const uploadFile = require("../middlewares/multerMiddleware");
const validationRegister = require("../middlewares/validateRegisterMiddleware");


//form login
router.get("/login",guestMiddleware, userController.login);
router.post("/login", userController.loginProcess);


//usuario
router.get("/profile",authMiddleware , userController.profile);
router.get("/logout",authMiddleware , userController.logout);


//form registro
router.get('/register', guestMiddleware, userController.register);
//proceso registro
router.post("/register", uploadFile.single("profile-image"), validationRegister, userController.processRegister);

module.exports = router;