var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loginTeacher', function(req, res, next) {
    res.render('login');
  });
  
  module.exports = router;