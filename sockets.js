const { json } = require('body-parser');
const { get } = require('mongoose');

module.exports = function (io) {
	let projects = new Map(); //
	let cnt = 0;
	io.on('connection', (socket) => {
		console.log('a user connected');
		socket.on('disconnect', () => {
			console.log('user disconnected');
			let projectIDs = new Set();
			for (let [key, value] of projects) {
				if (value.has(socket.id)) {
					projectIDs.add(key);
					value.delete(socket.id);
					io.to(key).emit('userList', Array.from(projects.get(key).values()));
				}
				if (value.size == 0) projects.delete(key);
			}
		});

		socket.on('addMember', (data) => {
			socket.join(data.projectID);
			if (!projects.has(data.projectID)) {
				projects.set(data.projectID, new Map());
				projects.get(data.projectID).set(socket.id, data.name);
				io.to(data.projectID).emit('userJoin', data.name);
				io.to(data.projectID).emit('userList', Array.from(projects.get(data.projectID).values()));
			} else {
				if (!projects.get(data.projectID).has(socket.id)) {
					projects.get(data.projectID).set(socket.id, data.name);
					io.to(data.projectID).emit('userJoin', data.name);
					io.to(data.projectID).emit('userList', Array.from(projects.get(data.projectID).values()));
				}
			}
			//  console.log(projects.get(data.projectID));
		});

		socket.on('reload', (data) => {
			// console.log("in reload -- > ");
			if (!projects.has(data.projectID)) {
				console.log("ERROR : we have not this project '" + data.projectID);
			} else {
				socket.leave(data.projectID);
				io.to(data.projectID).emit('reload', { id: socket.id, time: data.time });
				socket.join(data.projectID);
			}
		});

		socket.on('reload complete', (projectID) => {
			if (!projects.has(projectID)) {
				console.log("ERROR : we have not this project '" + projectID);
			} else {
				cnt++;
				if (projects.get(projectID).size == cnt) {
					console.log(socket.id + ' reload completed.');
					cnt = 0;
					io.to(projectID).emit('reload complete', socket.id);
				}
			}
		});
	});
};
