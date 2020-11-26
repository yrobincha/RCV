const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
	projectID: String,
	name: String,
    members: [],
    sourceVideos: [],
    sourceAudios: []
});

module.exports = mongoose.model('projects',ProjectSchema);