// const appModule = require('../app.js');
const db = require('../database')
class DaoAdoptaUnProfe{
  pool;

  constructor(pool){
      //asignandole el pool de conexiones al pool del Dao
      this.pool = db.pool;
  }

  //generando la conexion del pool
  async getConnection() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          resolve(connection);
        }
      });
    });
  }


// operacion para realizar consultas
async query(...params) {
  const connection = await this.getConnection();
  return new Promise((resolve, reject) => {
    connection.query(...params, (error, results) => {
      connection.release(); // Liberar la conexión cuando hayas terminado
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}



}

module.exports = DaoAdoptaUnProfe;