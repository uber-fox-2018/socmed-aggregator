const express = require("express");
const router = express.Router();
let GithubController = require("../controllers/githubAPIcontroller");

router.get("/", (req, res) => {
	res.send("Github Works");
});

router.get("/me", GithubController.getOwnUserInfo);

router.get(
	"/search-repo-name/:repo_name",
	GithubController.searchRepobyName
);

router.post("/me/create-repo/:repo_name", GithubController.createRepo);

module.exports = router;
