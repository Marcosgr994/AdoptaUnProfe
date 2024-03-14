var express = require('express');
var router = express.Router();
var app = require('../app.js');


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


router.get('/SolicitarServicioAUnProfesor', (req, res, next) => {
  // Se estable la conexion a la BBDD
  app.pool.getConnection((err, conexion) => {
    // Si hay error se avisa
    if (err) {
      res.status(500);
      res.json({ msg: "Error al obtener la conexión con la base de datos" });
    } else {

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
      const queryIdProfesor = `SELECT * FROM profesores WHERE correo = ${mailProfesor}`;
      const queryIdAlumno = `SELECT * FROM alumnos WHERE correo = ${mailAlumno}`;
      let idProfesor, idAlumno;
      conexion.query(queryIdProfesor, (errProfesor, data) => {
        if (errProfesor) {
          conexion.release();
          res.status(500);
          res.json({ msg: "error al realizar la consulta a la base de datos" });
        } else {
          idProfesor = data[0];
          res.status(200);
        }
      })
      conexion.query(queryIdAlumno, (errAlumno, data) => {
        if (errAlumno) {
          conexion.release();
          res.status(500);
          res.json({ msg: "error al realizar la consulta a la base de datos" });
        } else {
          idAlumno = data[0];
          res.status(200);
        }
      })
      // Aquí puedes almacenar la solicitud en una base de datos o enviarla por correo electrónico al profesor correspondiente
      const insertIntoServicios = `INSERT INTO servicios (id_profesor, id_alumno, fecha, hora_inicio, telefono, materia) VALUES (${idProfesor}, ${idAlumno}, ${fecha}, ${horaInicio}, ${telefono}, ${materia})`;
      conexion.insert(insertIntoServicios, (errInsert, data) => {
        if (errInsert) {
          conexion.release();
          res.status(500);
          res.json({ msg: "error al realizar la insercion a la base de datos" });
        } else {
          res.status(200);
          res.json({ msg: "Solicitud almacenada correctamente" })
        }
      })
      // En este ejemplo, simplemente responderemos con un mensaje de éxito
      res.send('Solicitud enviada correctamente.');
    }

  })
  // Se llama a next para que otro middleware pueda ejecutarse segun el evento que se produzca
  next();
})

function validarFecha(fecha) {
  const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
  return regexFecha.test(fecha);
}

module.exports = router;