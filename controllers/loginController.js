const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
userID : Number,
name : String,
projectIDs : []
})

var User = mongoose.model('users', UserSchema);

exports.login = (req, res) => {
	console.log(req.body);

	User.findOne({userID : req.body.userID}, (err, user) => {
		if(!user){
				var newUser = new User();
				newUser.userID = req.body.userID;
				newUser.name = req.body.name;
				newUser.save( () => {res.json({result : 1})});
			}
			else{
				res.json(user.projectIDs);
			}

	})

}
