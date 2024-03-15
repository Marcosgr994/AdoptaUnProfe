var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/solicitudes', function(req, res, next) {
  res.render('solicitudesAlumno', { title: 'Solicitudes del alumno' });
});

router.get('/solicitudes/:usuario', function(req, res, next) {
  res.render('solicitudesAlumno', { title: 'Solicitudes del alumno' });
});

module.exports = router;
