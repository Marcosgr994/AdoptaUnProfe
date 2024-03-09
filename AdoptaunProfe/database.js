const mysql = require('mysql');

var datosBD = {
    host:"localhost",
    user:"AUP",
    password:"Abrete01",
    database:"adoptaunprofe"
  }
  
  var poolBD = mysql.createPool(datosBD);

  module.exports = {
    pool: poolBD,
  };