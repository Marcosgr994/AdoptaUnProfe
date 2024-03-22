const DaoAdoptaUnProfe = require('./DAOAdoptaUnProfe.js')

class DaoSolicitud extends DaoAdoptaUnProfe {
  // Guardar la solicitud en la BBDD
  async altaSolicitud (solicitud) {
    const sql = 'INSERT INTO solicitudes(emailProfesor, emailAlumno, fecha) VALUES (?, ?, ?)'
    return this.query(sql, [solicitud.emailProfesor, solicitud.emailAlumno, solicitud.fecha])
  }

  async actualizarSolicitud (solicitud) {
    const sql = 'UPDATE solicitudes SET estado = ? WHERE idProfesor = ? AND idAlumno = ? AND fecha = ? AND horaInicio = ? AND materia = ? AND telefono = ?'
    return this.query(sql, ['ACEPTADA', solicitud.idProfesor, solicitud.idAlumno, solicitud.fecha, solicitud.horaInicio, solicitud.materia, solicitud.telefono])
  }
}

module.exports = {
  DaoSolicitud
}
