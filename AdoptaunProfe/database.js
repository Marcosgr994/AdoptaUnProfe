const mysql = require('mysql');

var datosBD = {
    host:"database-1.cbu262uig8d7.eu-north-1.rds.amazonaws.com",
    user:"admin",
    password:"Abrete01",
    database:"adoptaunprofe"
  }
  
  var poolBD = mysql.createPool(datosBD);

  module.exports = {
    pool: poolBD,
  };