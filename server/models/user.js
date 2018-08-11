const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: { type: String, required: true },
	password: { type: String },
	email: { type: String, required: true },
	fb_id: { type: String },
	role: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
