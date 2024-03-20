var express = require('express');
var router = express.Router();
var app = require('../app.js');

const daoAlumnos = new DaoAlumnos();
const daoProfesores = new DaoProfesores();
const daoSolicitudes = new DaoSolicitudes();


/* GET home page. */
router.get('/BuscarProfesorPorKeyword/:keyword', function (req, res, next) {
  var select = 'SELECT * from profesores where UPPER(nombre) like UPPER(?) or UPPER(apellidos) like UPPER(?) or UPPER(materia) like UPPER(?) order by nombre'
  var n = '%' + req.params.keyword + '%';
  //en esta funcion se guardará tanto la informacio como el logo
  app.pool.getConnection(function (err, conexion) {
    if (err) {
      res.status(500);
      res.json({ msg: "Error al obtener la conexión en la base de datos" });
    } else {
      conexion.query(select, [n, n, n], function (error, data) {

        if (error) {
          //nos aseguramos que la facultad exista
          conexion.release();
          res.status(500);
          res.json({ msg: "error al realizar la consulta a la base de datos" });
        } else {
          if (data.length > 0) {
            res.status(200);
            res.json({ listado: data });
          } else {
            res.status(400);
            res.json({ msg: "No existe ningún profesor con esas características" });
          }
        }
      })
    }
  })
});

router.get('/BuscarProfesorPorKeyword/', function (req, res, next) {
  var select = 'SELECT * from profesores order by nombre'
  //en esta funcion se guardará tanto la informacio como el logo
  app.pool.getConnection(function (err, conexion) {
    if (err) {
      res.status(500);
      res.json({ msg: "Error al obtener la conexión en la base de datos" });
    } else {
      conexion.query(select, function (error, data) {

        if (error) {
          //nos aseguramos que la facultad exista
          conexion.release();
          res.status(500);
          res.json({ msg: "error al realizar la consulta a la base de datos" });
        } else {
          if (data.length > 0) {
            res.status(200);
            res.json({ listado: data });
          } else {
            res.status(400);
            res.json({ msg: "No existe ningún profesor con esas características" });
          }
        }
      })
    }
  })
});

router.get('/SolicitarServicioAUnProfesor', function(req, res, next) {
  res.render('SolicitarServicioAUnProfesor', { title: 'Solicitar servicio a un profesor' });
});

router.post('/SolicitarServicioAUnProfesor', async (req, res, next) => {
  try {
    // Se guardan los datos enviados por el alumno
    const { fecha, horaInicio, telefono, materia, mailProfesor, mailAlumno } = req.body;

    // Se validan los datos enviados por el alumno
    if (!fecha || !validarFecha(fecha)) {
        return res.status(400).send('Fecha incorrecta.');
    }
    if (!horaInicio || isNaN(horaInicio) || horaInicio < 9 || horaInicio > 22) {
        return res.status(400).send('Hora de inicio incorrecta.');
    }
    if (!telefono || isNaN(telefono) || telefono.length !== 9) {
        return res.status(400).send('Teléfono incorrecto.');
    }
    if (!materia || materia.length > 25) {
        return res.status(400).send('La longitud del campo "materia" es muy largo, intenta recortarlo');
    }

    const alumno = await daoAlumnos.obtenerAlumnoPorEmail(mailAlumno);
    if (!alumno) {
        return res.status(400).send('Alumno no encontrado');
    }

    const profesor = await daoProfesores.obtenerProfesorPorEmail(mailProfesor);
    if (!profesor) {
        return res.status(400).send('Profesor no encontrado');
    }

    await daoSolicitudes.altaSolucitud(profesor.id, alumno.id, fecha, horaInicio, telefono, materia);

    res.status(200).json({ msg: "Solicitud almacenada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
})

function validarFecha(fecha) {
  const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
  return regexFecha.test(fecha);
}

module.exports = router;