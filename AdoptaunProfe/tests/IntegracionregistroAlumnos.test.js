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

    // Antes de todas las pruebas
    beforeAll(async () => {
        await dao.query(`INSERT INTO alumnos (usuario, email, contrasena) VALUES (?, ?, ?)`, [alumnoPrueba.usuario, alumnoPrueba.email, alumnoPrueba.contrasena]);
    });

    // Después de todas las pruebas
    afterAll(async () => {
        await dao.query(`DELETE FROM alumnos WHERE email = ?`, [alumnoPrueba.email]);
        await db.pool.end();
    });

    // Prueba para obtener un alumno por email
    test("obtener un alumno por su correo electrónico", async () => {
        // Realiza la llamada al método para obtener el alumno por su correo electrónico
        const result = await dao.obtenerAlumnoPorEmail(alumnoPrueba.email);

        // Comprobar resultado
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            usuario: alumnoPrueba.usuario,
            email: alumnoPrueba.email,
            contrasena: alumnoPrueba.contrasena
        }));
    });
});
