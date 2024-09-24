const express=require("express");
const {
    registerUser, 
    loginUser , logout,
     forgetpassword , 
     resetpassword,
      getuserdetail,
       updatepassword ,
        updateprofile,
        getalluser, 
        getsingleuser,
        updaterole,
        deleteuser
    } =require("../controller/usecontroller");
const router=express.Router();
const {isAuthenticated , autorizerole }=require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetpassword);
router.route("/password/reset/:token").put(resetpassword); // to changing the password

router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated , getuserdetail);
router.route("/password/update").put(isAuthenticated , updatepassword);
router.route("/me/update").put(isAuthenticated , updateprofile);
router.route("/admin/users").get(isAuthenticated , autorizerole("admin") , getalluser );
router
.route("/admin/user/:id")
.get(isAuthenticated , autorizerole("admin") , getsingleuser )
.put(isAuthenticated , autorizerole("admin")  , updaterole)
.delete(isAuthenticated , autorizerole("admin") , deleteuser);
;

module.exports=router;