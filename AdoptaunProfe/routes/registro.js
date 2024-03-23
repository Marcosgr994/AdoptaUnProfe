var express = require('express');
var router = express.Router();
const DaoProfesor = require("../DAO/DaoProfesores");
const multer = require("multer");
const { check, validationResult } = require("express-validator");

router.use(express.json());
const multerFactory = multer({ storage: multer.memoryStorage() });
const db = require("../database");
const daoProfesor =new DaoProfesor(db.pool);


router.post('/Profesorsignup',multerFactory.none(),[
  //validacion de nombre de usuario
  check("username").isAlphanumeric().withMessage("El usuario debe contener solo letras y números"),
  //validacion de email
  check("email").isEmail().withMessage("El correo electrónico no es válido")
  .custom(async (value, { req }) => {
      const validDomains = ['.com', '.es'];
      const domain = value.split('@')[1];
      const domainIsValid = validDomains.some(validDomain => domain.endsWith(validDomain));
      if (!domainIsValid) {
          throw new Error("El dominio del correo electrónico no es válido");
      }

      // Verificar si el correo electrónico ya está registrado en la base de datos
      const profesorExistente = await daoProfesor.obtenerProfesorPorEmail(value);
      if (profesorExistente) {
          throw new Error("El correo electrónico ya está registrado");
      }
      
      return true;
  }),
   // Validación de la contraseña
   check("password").isLength({ min: 8, max: 24 }).withMessage("La contraseña debe tener entre 8 y 24 caracteres"),
   //validacion de repeticion de contraseña

   check("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
    }
    return true;
})], 
async (reqmres)=>{
  //comprobar erores de validacion
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      // Concatenar todos los mensajes de error en una sola cadena
      const errorMessages = errors.array().map(error => error.msg).join("\n");
      return res.status(400).json({ error: errorMessages });
  }
  // //procesar el registro del alumno
  // const {username,}
}
)


/* GET users listing. */
router.get('/Profesorsignup', function(req, res, next) {
    res.render('registro');
  });
  
  module.exports = router;