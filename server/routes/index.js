var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('http://localhost:3001/api/');
  res.send({title: 'hello react!'});
  res.render('index', { title: 'Express' });
});

module.exports = router;
