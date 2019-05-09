// built-in modules
const path = require('path');
// declared dependencies
const fse = require('fs-extra');

var express = require('express');
var router = express.Router();

const getGeneratedHtml = () => {
  const srcGeneratedHtmlFolder = './generated_html';
  let allGeneratedHtml = [];
  fse.readdirSync(srcGeneratedHtmlFolder).forEach(async (file) => {
    allGeneratedHtml.push(file);
  });
  return allGeneratedHtml;
};



/* GET home page. */
router.get('/', function(req, res, next) {
  const allGeneratedHtml = getGeneratedHtml();
  res.render('index', { title: 'Express', allGeneratedHtml: allGeneratedHtml });
});

/* GET specific page generated */
router.get('/:htmlName', function(req, res, next) {
  res.sendFile(req.params.htmlName, {root: path.normalize(__dirname + "/../generated_html")});
});

module.exports = router;
