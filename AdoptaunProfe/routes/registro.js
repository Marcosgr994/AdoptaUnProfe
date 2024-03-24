var express = require('express');
var router = express.Router();
const DaoProfesor = require("../DAO/DaoProfesores");
const multer = require("multer");
const { check, validationResult } = require("express-validator");

router.use(express.json());
const multerFactory = multer({ storage: multer.memoryStorage() });
const db = require("../database");
const daoProfesor = new DaoProfesor(db.pool);

router.post('/Profesorsignup', multerFactory.none(), [
    // Validación de nombre de profesor
    check("username").isAlphanumeric().withMessage("El usuario debe contener solo letras y números"),
    // Validación de email
    check("email").isEmail().withMessage("El correo electrónico no es válido")
        .custom(async (value, { req }) => {
            const validDomains = ['.com', '.es']; // Domínios válidos
            const domain = value.split('@')[1];
            const domainIsValid = validDomains.some(validDomain => domain.endsWith(validDomain));
            if (!domainIsValid) {
                throw new Error("El dominio del correo electrónico no es válido");
            }

            // Verificar si existe el email
            const profesorExistente = await daoProfesor.obtenerProfesorPorEmail(value);
            if (profesorExistente) {
                throw new Error("El correo electrónico ya está registrado");
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
    // Comprobar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Concatenar todos los mensajes de error en una sola cadena
        const errorMessages = errors.array().map(error => error.msg).join("\n");
        return res.status(400).json({ error: errorMessages });
    }

    // Procesar el registro del profesor
    const { username, apellidos, email, materia, rangos, desc, password } = req.body;
    try {
        // Realizar el alta del profesor
        await daoProfesor.altaProfesor(username, apellidos, materia, rangos, email, desc, password);
        res.status(200).json({ message: "Profesor registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar al profesor" });
    }
});

/* GET users listing. */
router.get('/Profesorsignup', function (req, res, next) {
    res.render('registro');
});

module.exports = router;
