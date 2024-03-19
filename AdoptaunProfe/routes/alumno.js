var express = require('express');
var router = express.Router();
var app = require('../app.js');
var DAOSolicitudes = require("../DAO/DaoSolicitudes.js");

const DaoSolicitudes = new DAOSolicitudes();

/* GET users listing. */
router.get('/solicitudes', function(req, res, next) {
  res.render('solicitudesAlumno', { title: 'Solicitudes del alumno' });
});

//obtenemos el listado de solicitudes
router.get('/solicitudes/:usuario', async function(req, res, next) {

  var n = req.params.usuario;

  try{
    var listado = await DaoSolicitudes.obtenerSolicitudPorId(n);

    if(listado.length > 0){
        res.status(200);
        res.json({listado});
    } else {
        res.status(400);
        res.json({msg: "No hay ninguna solicitud disponible"});
    }

  } catch(error){
    console.error("Error al listar las solicitudes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }

});

module.exports = router;
