const request = require('supertest');
const express = require('express');
const router=require("../routes/registro");
const app = express();
app.use(express.json());
app.use('/', router);
const DaoAlumnos = require("../DAO/DaoAlumnos");
describe('POST /signup',()=>{
    test('registrando un alumno correctamente', async()=> {

        // Mockear el comportamiento de la base de datos
        const mockDaoAlumnos = {
            obtenerAlumnoPorEmail: jest.fn().mockReturnValue(null), // Simula que el correo no está registrado
            altaAlumnos: jest.fn().mockResolvedValue(), // Simula la inserción exitosa del alumno
        };
    
        // Sustituir la instancia de DaoAlumnos con el mock
        DaoAlumnos.prototype.obtenerAlumnoPorEmail = mockDaoAlumnos.obtenerAlumnoPorEmail;
        DaoAlumnos.prototype.altaAlumnos = mockDaoAlumnos.altaAlumnos;

        //ingresando un alumno ficticio
        const newAlumnos={
            usuario: 'alberto',
            email: 'test123@xyz.com',
            contrasena: "1234alberto",
            contrasena_repetida: "1234alberto"
        };
        // Simulando la solicitud POST
        const response = await request(app)
        .post('/signup')
        .send(newAlumnos);
        // Comprobar que se conecto correctamente
        expect(response.status).toBe(201);
        // Comprobar que la respuesta contiene el mensaje de éxito esperado
        expect(response.body).toHaveProperty('mensaje', 'Alumno registrado exitosamente');
    });

    test('debería devolver un error si el correo electrónico ya está registrado', async () => {
        // Mockear el comportamiento de la base de datos
        const mockDaoAlumnos = {
            obtenerAlumnoPorEmail: jest.fn().mockReturnValue({}), // Simula que el correo está registrado
            altaAlumnos: jest.fn().mockResolvedValue(), // Simula la inserción exitosa del alumno
        };
    
        // Sustituir la instancia de DaoAlumnos con el mock
        DaoAlumnos.prototype.obtenerAlumnoPorEmail = mockDaoAlumnos.obtenerAlumnoPorEmail;
        DaoAlumnos.prototype.altaAlumnos = mockDaoAlumnos.altaAlumnos;
    
        // Datos del alumno con un correo electrónico que ya está registrado
        const alumno = {
            usuario: 'existinguser',
            email: 'existing@example.jp',
            contrasena: 'existingpassword',
            contrasena_repetida: 'existingpassword'
        };
    
        // Simulando la solicitud POST 
        const response = await request(app)
            .post('/signup')
            .send(alumno);
    
        // Comprobar que la respuesta tiene el error 400
        expect(response.status).toBe(400);
    
        // Comprobar que la respuesta contiene el mensaje de error esperado
        expect(response.body.errors).toContain('El dominio del correo electrónico no es válido');
    });
    
});

