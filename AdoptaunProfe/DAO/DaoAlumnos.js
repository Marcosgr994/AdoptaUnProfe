const DaoAdoptaUnProfe = require("./DAOAdoptaUnProfe")

class DaoAlumnos extends DaoAdoptaUnProfe{

    //ALta Alumno
    async altaAlumnos(alumnos){
        //comprobar que llega
      console.log(alumnos);  
      const sql="INSERT INTO alumnos(nombre,email,contrasena) VALUES(?,?,?)";
      return this.query(sql,[alumnos.nombre,alumnos.email,alumnos.contrasena]);
    }

    // Obtener alumno por correo electrónico
    async obtenerAlumnoPorEmail(email) {
      const sql = "SELECT * FROM alumnos WHERE email = ?";
      const result = await this.query(sql, [email]);
      return result.length > 0 ? result[0] : null;
    }

};

module.exports=DaoAlumnos;