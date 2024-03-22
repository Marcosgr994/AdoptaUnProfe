const express = require('express')
const router = express.Router()
// const app = require('../app.js')

const DaoSolicitudes = require('../DAO/DaoSolicitudes.js')

const daoSolicitudes = new DaoSolicitudes()

router.get('/solicitudes', (req, res, next) => {
  res.render('solicitudesProfesor', { title: 'Aceptar solicitud de un alumno' })
})

router.post('/solicitudes/aceptarSolicitud:solicitud', async (req, res, next) => {
  try {
    const { solicitud } = req.params

    solicitud.estado = 'ACEPTADA'

    await daoSolicitudes.actualizarSolicitud(solicitud)

    res.status(200).json({ msg: 'Solicitud aceptada' })

    // app.pool.getConnection((err, conexion) => {
    //   if (err) {
    //     res.status(500).json({ msg: 'Error al obtener la conexion de la BBDD' })
    //   } else {

    //     conexion.query(sql, ['ACEPTADA', solicitud.idProfesor, solicitud.idAlumno, solicitud.fecha, solicitud.horaInicio, solicitud.materia, solicitud.telefono], (error, data) => {
    //       if (error) {
    //         conexion.release()
    //         res.status(500).json({ msg: 'Error al insertar la solicitud en la BBDD' })
    //       } else {
    //         res.status(200).json({ msg: 'Solicitud guardada en la BBDD con exito' })
    //       }
    //     })
    //   }
    // })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Error interno del servidor' })
  }
})

module.exports = {
  router
}
