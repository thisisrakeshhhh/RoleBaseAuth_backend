//all the authentication routes files
const express = require("express");
const authController = require("../controllers/auth.controller");


const router = express.Router();


router.post("/register", authController.registerUser);//this is my apis to call the registerUser

router.post("/login", authController.loginUser); //this is my apis to call the loginUser

module.exports = router;