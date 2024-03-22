const DaoAdoptaUnProfe = require("./DaoAdoptaUnProfe")

class DaoSolicitudes extends DaoAdoptaUnProfe{

    //ALta Solicitud (create)
    async altaSolucitud(idProfesor, idAlumno, fecha, horaInicio, telefono, materia){
        //comprobar que llega
      console.log(idProfesor, idAlumno, fecha, horaInicio, telefono, materia);  
      const sql="INSERT INTO solicitudes (idProfesor, idAlumno, fecha, hora_inicio, telefono, materia) VALUES (?,?,?,?,?,?)";
      return this.query(sql,[idProfesor, idAlumno, fecha, horaInicio, telefono, materia]);
    }

    // Obtener solicitud por id de alumno (ReadById)
    async obtenerSolicitudPorId(idAlumno) {
      const sql = 'SELECT p.nombre, p.apellidos, s.estado'
      +' FROM profesores p'
      +' INNER JOIN solicitudes s ON p.id = s.IdProfesor'
      +' WHERE s.idAlumno = ?';
      const result = await this.query(sql, [idAlumno]);
      return result.length > 0 ? result : []; //devuelve solicitudes o un array vacio
    }

    // Actualizar solicitud
    async actualizarSolicitud(solicitud) {
      const sql = 'UPDATE solicitudes SET estado = ? WHERE idProfesor = ? AND idAlumno = ? AND fecha = ? AND horaInicio = ? AND materia = ?';
      return this.query(sql, ['ACEPTADA', solicitud.idProfesor, solicitud.idAlumno, solicitud.fecha, solicitud.horaInicio, solicitud.materia])
    }

};

module.exports=DaoSolicitudes;