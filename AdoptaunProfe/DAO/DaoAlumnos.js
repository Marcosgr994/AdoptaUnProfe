const DaoAdoptaUnProfe = require("./DAOAdoptaUnProfe")

class DaoAlumnos extends DaoAdoptaUnProfe{

    //ALta Alumno
    async altaAlumnos(alumnos){
        //comprobar que llega
      console.log(alumnos);  
      const sql="INSERT INTO alumnos(nombre,email,contrasena) VALUES(?,?,?)";
      return this.query(sql,[alumnos.nombre,alumnos.email,alumnos.contrasena]);
    }

};

module.exports=DaoAlumnos;