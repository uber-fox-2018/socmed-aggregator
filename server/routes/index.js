const express = require('express');
const router = express.Router();
const github = require("./GITHUBapi");
const fbAPI = require("./FBapi");

router.use("/api/github", github);
router.use("/api/fb",fbAPI);

router.get("/", (req, res) => {
	res.send("This API Works!");
});

	
module.exports = router;
