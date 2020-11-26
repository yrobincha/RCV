import { config } from "../config";
import { nanoid } from "nanoid";
import projectManager from "../models/projectManager";
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	userID: Number,
	name: String,
	projectIDs: []
})

var User = mongoose.model('users', UserSchema);

exports.login = (req, res) => {
	var sess;
	sess = req.session;

	User.findOne({ userID: req.body.userID }, (err, user) => {
		if (!user) {
			var newUser = new User();
			newUser.userID = req.body.userID;
			newUser.name = req.body.name;
			newUser.save(() => { res.json({ result: 1 }) });
		}
		else {
			res.json(user.projectIDs);
		}
	})
	sess.userID = req.body.userID;
	sess.name = req.body.name;
	console.log(sess);

}

exports.projectPOST = (req, res, next) => {
	var sess;
	sess = req.session;
	
	let projectID = nanoid(32);
	fs.mkdir(
		path.join(config.projectPath, projectID),
		{ recursive: true },
		(err) => {
			if (err) return next(err);
			
			User.updateOne({ userID: sess.userID }, { "$push": { projectIDs: projectID } }, 
			(err, user) => {
				if(err) return console.log("error");
				console.log('projectID added')
			})
			projectManager.save(projectID, projectManager.init()).then(
				() => res.json({ project: projectID }),
				(err) => next(err)
			);
		}
	);
	console.log(sess);
};
