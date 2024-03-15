var express = require('express');
const router = express.Router();
const DaoAlumnos=require("../DAO/DaoAlumnos");
const multer=require("multer");
const { check } = require("express-validator");
const { validationResult } = require('express-validator');
router.use(express.json())
const multerFactory = multer({ storage: multer.memoryStorage() });
const daoAlumnos = new DaoAlumnos();
//comprobar la validez del registro
router.post("/signup",multerFactory.none(),
[
   // Validación del nombre de usuario
   check("usuario").isAlphanumeric().withMessage("El usuario debe contener solo letras y números"),
  
   // Validación del correo electrónico
   check("email").isEmail().withMessage("El correo electrónico no es válido"),
   
   // Validación de la contraseña
   check("contrasena").isLength({ min: 8, max: 24 }).withMessage("La contraseña debe tener entre 8 y 24 caracteres"),
   
     // Validación de repetición de contraseña
  check("contrasena_repetida").custom((value, { req }) => {
    if (value !== req.body.contrasena) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  })
],async(req,res)=>{
   // Comprobación de errores de validación
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

  // Procesar el registro del alumno
  console.log("esto es mi req:",req.body);
  const { usuario, email, contrasena } = req.body;
  try {
    // Verificar si el correo electrónico ya está registrado en la base de datos
    const alumnoExistente = await daoAlumnos.obtenerAlumnoPorEmail(email);
    if (alumnoExistente) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }
    // Registrar al alumno en la base de datos
    await daoAlumnos.altaAlumnos({ usuario, email, contrasena });
    res.status(201).json({ mensaje: "Alumno registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
);


/* GET users listing. */
router.get('/signup', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('registro.ejs');
});
// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

module.exports = router;
