var express = require('express');
const router = express.Router();
const DaoAlumnos=require("../DAO/DaoAlumnos");
const multer=requiere("multer");
const { check } = require("express-validator");
router.use(express.json())
//comprobar la validez del registro
// router.post()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
