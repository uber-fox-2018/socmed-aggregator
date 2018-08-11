const User = require("../models/user");
const authHelper = require("../helpers/authhelper.js");
const mongo = require("mongodb").ObjectID;

class UserRequestController {
	constructor() {}

	static fbLogin(req, res) {
		console.log("entered FB login", req.body);
		let { accessToken, userID } = req.body;
		authHelper
			.getFacebookCredential(accessToken)
			.then(result => {
				result = JSON.parse(result);
				console.log(result);
				User.findOne({ email: result.email })
					.then(userFound => {
						if (userFound) {
							res.status(200).json({
								message: "login success",
								token: authHelper.createToken({ id: userFound._id.valueOf() })
							});
						} else {
							return User.create({
								email: result.email,
								name: result.name,
								role: "user",
								fb_id: userID,
								password: "123"
							});
						}
					})
					.then(newUser => {
						res.status(200).json({
							message: "New User created",
							token: authHelper.createToken({ id: newUser._id.valueOf() })
						});
					})
					.catch(err => {
						res.status(400).json(err);
					});
			})
			.catch(err => {
				res.status(400).json(err);
			});
	}

	static verifyToken(req, res) {
		let id = authHelper.decodeToken(req.body.token).id;
		User.findById(mongo(id))
			.then(userFound => {
				if (userFound) {
					res.status(200).json({
						message: "OK"
					});
				} else {
					res.status(204).json({
						message: "NK"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}
}

module.exports = UserRequestController;
