const express = require("express");
const router = express.Router();
const user = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl, isLoggedin} = require("../middleware.js")

const userController = require("../controller/users.js")


router.route("/signup")
   .get(userController.renderSignUpFrom) 
   .post(wrapAsync(userController.signUp))


router.route("/login")
   .get(userController.renderLoginFrom)
   .post(
      saveRedirectUrl ,
      passport.authenticate('local',{ 
         failureRedirect: '/login', 
         failureFlash:true
      }),
      userController.Login
    )


router.get("/logout",userController.logout)

module.exports = router