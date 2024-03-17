const DaoAdoptaUnProfe = require('./DAOAdoptaUnProfe.js')

class DaoSolicitud extends DaoAdoptaUnProfe {
  // Guardar la solicitud en la BBDD
  async altaSolicitud (solicitud) {
    const sql = 'INSERT INTO solicitudes(emailProfesor, emailAlumno, fecha) VALUES (?, ?, ?)'
    return this.query(sql, [solicitud.emailProfesor, solicitud.emailAlumno, solicitud.fecha])
  }
}

module.exports = {
  DaoSolicitud
}
