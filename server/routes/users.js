var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var testFolder = './data';
var fs = require('fs');
 
router.use(bodyParser.json());

var client_list = [];

router.route('/')
	.get((req, res, next) => {
		res.send(req.body.name);
	})
	.post((req, res, next) => {
		client_list.push(req.body.name);
		res.send(client_list);
	})
	.put((req, res, next) => {
		res.send(req.body.name);
	})


module.exports = router;
