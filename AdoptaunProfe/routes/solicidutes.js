const express = require('express')
const router = express.Router()
const app = require('../app.js')

router.get('/solicitudes', (req, res, next) => {
  res.render('solicitudesProfesor', { title: 'Aceptar solicitud de un alumno' })
})

router.get('/solicitudes/aceptarSolicitud:solicitud', (req, res, next) => {
  const select = 'INSERT INTO solicitudes(emailProfesor, emailAlumno, fecha) VALUES (?, ?, ?)'
  const { solicitud } = req.params
  app.pool.getConnection((err, conexion) => {
    if (err) {
      res.status(500).json({ msg: 'Error al obtener la conexion de la BBDD' })
    } else {
      conexion.query(select, [solicitud.emailProfesor, solicitud.emailAlumno, solicitud.fecha], (error, data) => {
        if (error) {
          conexion.release()
          res.status(500).json({ msg: 'Error al insertar la solicitud en la BBDD' })
        } else {
          res.status(200).json({ msg: 'Solicitud guardada en la BBDD con exito' })
        }
      })
    }
  })
})

module.exports = {
  router
}
