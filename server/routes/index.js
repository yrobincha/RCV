var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;

router.use(
	session({
		secret: '@#@$MYSIGN#@$#$',
		resave: false,
		saveUninitialized: true
	})
);

router.get('/404', function (req, res) {
	res.render('error.html');
});

router.get('/', function (req, res) {
	server.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
	var sess = req.session;
	res.render('index', {
		title: 'MY HOMEPAGE',
		length: 5,
		name: sess.name,
		username: sess.username
	});
});

router.post('/login', function (req, res) {
	var result = {};
	var userID = req.body.userID;

	// LOAD DATA & CHECK DUPLICATION
	fs.readFile(__dirname + '/../data/users.json', 'utf8', function (err, data) {
		var users = JSON.parse(data);
		if (users[userID]) {
			// DUPLICATION FOUND
			result['success'] = 0;
			result['error'] = 'duplicate';
			res.json(result);
			return;
		}

		// ADD TO DATA
		users[userID] = {
			name: req.body.uname,
			projectIDs: []
		};

		// SAVE DATA
		fs.writeFile(__dirname + '/../data/users.json', JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
			result = { success: 1 };
			res.json(result);
		});
	});
});

router.get('/list', function (req, res) {
	fs.readFile(__dirname + '/../data/' + 'user.json', 'utf8', function (err, data) {
		console.log(data);
		res.end(data);
	});
});

router.get('/getUser/:username', function (req, res) {
	fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
		var users = JSON.parse(data);
		res.json(users[req.params.username]);
	});
});

router.post('/addUser/:username', function (req, res) {
	var result = {};
	var username = req.params.username;

	// CHECK REQ VALIDITY
	if (!req.body['password'] || !req.body['name']) {
		result['success'] = 0;
		result['error'] = 'invalid request';
		res.json(result);
		return;
	}

	// LOAD DATA & CHECK DUPLICATION
	fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
		var users = JSON.parse(data);
		if (users[username]) {
			// DUPLICATION FOUND
			result['success'] = 0;
			result['error'] = 'duplicate';
			res.json(result);
			return;
		}

		// ADD TO DATA
		users[username] = req.body;

		// SAVE DATA
		fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
			result = { success: 1 };
			res.json(result);
		});
	});
});

router.put('/updateUser/:username', function (req, res) {
	var result = {};
	var username = req.params.username;

	// CHECK REQ VALIDITY
	if (!req.body['password'] || !req.body['name']) {
		result['success'] = 0;
		result['error'] = 'invalid request';
		res.json(result);
		return;
	}

	// LOAD DATA
	fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
		var users = JSON.parse(data);
		// ADD/MODIFY DATA
		users[username] = req.body;

		// SAVE DATA
		fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
			result = { success: 1 };
			res.json(result);
		});
	});
});

router.delete('/deleteUser/:username', function (req, res) {
	var result = {};
	//LOAD DATA
	fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
		var users = JSON.parse(data);

		// IF NOT FOUND
		if (!users[req.params.username]) {
			result['success'] = 0;
			result['error'] = 'not found';
			res.json(result);
			return;
		}

		// DELETE FROM DATA
		delete users[req.params.username];

		// SAVE FILE
		fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
			result['success'] = 1;
			res.json(result);
			return;
		});
	});
});

router.get('/login/:username/:password', function (req, res) {
	var sess;
	sess = req.session;

	fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
		var users = JSON.parse(data);
		var username = req.params.username;
		var password = req.params.password;
		var result = {};
		if (!users[username]) {
			// USERNAME NOT FOUND
			result['success'] = 0;
			result['error'] = 'not found';
			res.json(result);
			return;
		}

		if (users[username]['password'] == password) {
			result['success'] = 1;
			sess.username = username;
			sess.name = users[username]['name'];
			res.json(result);
		} else {
			result['success'] = 0;
			result['error'] = 'incorrect';
			res.json(result);
		}
	});
});

router.get('/logout', function (req, res) {
	sess = req.session;
	if (sess.username) {
		req.session.destroy(function (err) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		});
	} else {
		res.redirect('/');
	}
});
module.exports = router;
