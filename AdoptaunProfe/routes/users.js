var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signUp', function(req, res, next){
  res.render('signUp', {title: 'Registro'});
});

module.exports = router;
