
const DaoAdoptaUnProfe = require('./DAOAdoptaUnProfe.js')

class DaoSolicitud extends DaoAdoptaUnProfe {
    //ALta Solicitud (create)
    async altaSolucitud(idProfesor, idAlumno, fecha, horaInicio, telefono, materia){
        //comprobar que llega
      console.log(idProfesor, idAlumno, fecha, horaInicio, telefono, materia);  
      const sql="INSERT INTO solicitudes (idProfesor, idAlumno, fecha, hora_inicio, telefono, materia) VALUES (?,?,?,?,?,?)";
      return this.query(sql,[idProfesor, idAlumno, fecha, horaInicio, telefono, materia]);
    }

  async actualizarSolicitud (solicitud) {
    const sql = 'UPDATE solicitudes SET estado = ? WHERE idProfesor = ? AND idAlumno = ? AND fecha = ? AND horaInicio = ? AND materia = ? AND telefono = ?'
    return this.query(sql, ['ACEPTADA', solicitud.idProfesor, solicitud.idAlumno, solicitud.fecha, solicitud.horaInicio, solicitud.materia, solicitud.telefono])
  }
}

module.exports = {
  DaoSolicitud
}
