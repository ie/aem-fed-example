var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET specific page generated */
router.get('/:htmlName', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(req.params.htmlName, {root: __dirname + "/../generated_html"});
});

module.exports = router;
