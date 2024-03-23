const DaoAdoptaUnProfe = require("./DaoAdoptaUnProfe")

class DaoProfesores extends DaoAdoptaUnProfe{

    //ALta Alumno
    async altaProfesor(nombre, apellidos, materia,rangos, email,descripcion,contrasena){
        //comprobar que llega
      console.log(alumnos);  
      const sql="INSERT INTO profesores(nombre, apellidos, materia,rangos, email,descripcion, contrasena) VALUES(?,?,?,?,?,?,?)";
      return this.query(sql,[nombre, apellidos, materia,rangos, email,descripcion, contrasena]);
    }

    // Obtener alumno por correo electrónico
    async obtenerProfesorPorEmail(email) {
      const sql = "SELECT * FROM profesores WHERE email = ?";
      const result = await this.query(sql, [email]);
      return result.length > 0 ? result[0] : null;
    }

};

module.exports=DaoProfesores;



