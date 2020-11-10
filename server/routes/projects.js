var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const uploader = multer({dest:'uploads/'});


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

router.route('/:projectID/video')
	.get((req,res, next) => {
		res.render('index.html');
		})
	.post(uploader.single('video'), (req,res, next)=>{
		console.log('파일 업로드')
		res.send(req.file.filename);
	})


module.exports = router;
