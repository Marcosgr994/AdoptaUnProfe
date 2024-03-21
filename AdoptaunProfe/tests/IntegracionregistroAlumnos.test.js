// nuevoTestIntegracion.test.js
const DaoAlumnos = require("../DAO/DaoAlumnos");
const db = require("../database");

describe("Test de Integracion para Obtener Alumno por Correo Electrónico", () => {
    const dao = new DaoAlumnos(db.pool);

    // Datos de prueba
    const alumnoPrueba = {
        usuario: 'juan123',
        email: 'juan@example.com',
        contrasena: '12345juan',
    };

    // Antes de todas las pruebas, asegúrate de que el alumno de prueba esté en la base de datos
    beforeAll(async () => {
        await dao.query(`INSERT INTO alumnos (usuario, email, contrasena) VALUES (?, ?, ?)`, [alumnoPrueba.usuario, alumnoPrueba.email, alumnoPrueba.contrasena]);
    });

    // Después de todas las pruebas, elimina el alumno de prueba de la base de datos
    afterAll(async () => {
        await dao.query(`DELETE FROM alumnos WHERE email = ?`, [alumnoPrueba.email]);
        await db.pool.end();
    });

    // Prueba para obtener un alumno por su correo electrónico
    test("obtener un alumno por su correo electrónico", async () => {
        // Realiza la llamada al método para obtener el alumno por su correo electrónico
        const result = await dao.obtenerAlumnoPorEmail(alumnoPrueba.email);

        // Comprueba que el resultado no sea nulo y coincida con el alumno de prueba
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            usuario: alumnoPrueba.usuario,
            email: alumnoPrueba.email,
            contrasena: alumnoPrueba.contrasena
        }));
    });
});
