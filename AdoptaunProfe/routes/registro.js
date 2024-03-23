const express = require('express');
const router = express.Router();
const DaoAlumnos = require("../DAO/DaoAlumnos");
const multer = require("multer");
const { check, validationResult } = require("express-validator");

router.use(express.json());
const multerFactory = multer({ storage: multer.memoryStorage() });
var db = require("../database");
const daoAlumnos = new DaoAlumnos(db.pool);

router.post("/signup", multerFactory.none(), [
    // Validación del nombre de usuario
    check("username").isAlphanumeric().withMessage("El usuario debe contener solo letras y números"),

    // Validación email
    check("email").isEmail().withMessage("El correo electrónico no es válido")
    .custom((value, { req }) => {
        const validDomains = ['.com', '.es'];
        const domain = value.split('@')[1];
        const domainIsValid = validDomains.some(validDomain => domain.endsWith(validDomain));
        if (!domainIsValid) {
            throw new Error("El dominio del correo electrónico no es válido");
        }
        return true;
    }),

    // Validación de la contraseña
    check("password").isLength({ min: 8, max: 24 }).withMessage("La contraseña debe tener entre 8 y 24 caracteres"),

    // Validación de repetición de contraseña
    check("confirm_password").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    })
], async (req, res) => {
// Comprobación de errores de validación
const errors = validationResult(req);
if (!errors.isEmpty()) {
    // Concatenar todos los mensajes de error en una sola cadena
    const errorMessages = errors.array().map(error => error.msg).join("\n");
    return res.status(400).json({ error: errorMessages });
}


    // Procesar el registro del alumno
    const { username: usuario, email, password: contrasena } = req.body;
    console.log("requerimientos: ", req.body);
    try {
        // Verificar si el correo electrónico ya está registrado en la base de datos
        const alumnoExistente = await daoAlumnos.obtenerAlumnoPorEmail(email);
        if (alumnoExistente) {
            return res.status(400).send("El correo electrónico ya está registrado");
        }
        // ingresando el alta a BBDD
        await daoAlumnos.altaAlumnos({ usuario, email, contrasena });
        res.send({ message: "Alumno registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar alumno:", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get('/signup', function (req, res, next) {
    res.render('registro', { title: 'Registro' });
});

module.exports = router;
