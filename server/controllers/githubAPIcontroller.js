const request = require("request-promise");
let token = process.env.githubToken;
let getOptions = url => {
	return {
		url: url,
		headers: {
			Authorization: `${token}`,
			Accept: "application/vnd.github.nightshade-preview+json",
			"User-Agent": "Request-Promise"
		},
		json: true
	};
};

class GithubAPIController {
	constructor() {}
	
	static getOwnUserInfo(req, res) {
		console.log(token)
		request(getOptions("https://api.github.com/user/repos"))
			.then(data => {
				res.status(200).json({
					message: "repo found",
					data: data
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}

	static searchRepobyName(req, res) {
		request(
			getOptions(
				`https://api.github.com/search/repositories?q="${req.params.repo_name}"`
			)
		)
			.then(data => {
				res.status(200).json({
					message: `result for repo name with ${req.params.repo_name}`,
					data: data
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}

	static createRepo(req, res) {
		let options = getOptions("https://api.github.com/user/repos");
		//add body
		options.body = { name: req.params.repo_name };
		request
			.post(options)
			.then(data => {
				res.status(201).json({
					message: "repo created",
					data: data
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}
}

module.exports = GithubAPIController;
