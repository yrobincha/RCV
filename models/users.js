const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	userID: Number,
	name: String,
	projectIDs: []
});

module.exports = mongoose.model('users',UserSchema);