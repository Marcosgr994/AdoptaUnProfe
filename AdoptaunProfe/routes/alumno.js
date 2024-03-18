var express = require('express');
var router = express.Router();
var app = require('../app.js');

/* GET users listing. */
router.get('/solicitudes', function(req, res, next) {
  res.render('solicitudesAlumno', { title: 'Solicitudes del alumno' });
});

router.get('/solicitudes/:usuario', function(req, res, next) {

  var select = 'SELECT p.nombre, p.apellidos, s.estado'
  +' FROM profesores p'
  +' INNER JOIN solicitudes s ON p.id = s.IdProfesor'
  +' WHERE s.idAlumno = ?'
  var n=req.params.usuario;
  //Comprobamos la conexion
  app.pool.getConnection(function (err, conexion){
      if(err){
          res.status(500);
          res.json({msg: "Error al obtener la conexión en la base de datos"});
      } else{
          conexion.query(select, [n], function (error, data){

              if(error){
                  //nos aseguramos que la facultad exista
                  conexion.release();
                  res.status(500);
                  res.json({msg: "error al realizar la consulta a la base de datos"});
              } else{
                  if(data.length > 0){
                      res.status(200);
                      res.json({listado: data});
                  } else {
                      res.status(400);
                      res.json({msg: "No hay ninguna solicitud disponible"});
                  }
              }
          })
      }
  })
});

module.exports = router;
