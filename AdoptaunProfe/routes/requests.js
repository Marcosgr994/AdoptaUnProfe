var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/requests', function(req, res, next) {
    res.render('requestStudents');
  });
  
  module.exports = router;