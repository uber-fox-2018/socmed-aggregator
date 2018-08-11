var express = require("express");
var router = express.Router();
let UserController = require("../controllers/usercontroller");

router.route("/login").post(UserController.fbLogin);

router.post("/login/verifytoken", UserController.verifyToken);



module.exports = router;
