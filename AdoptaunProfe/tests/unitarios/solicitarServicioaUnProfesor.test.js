const request = require('supertest');
const express = require('express');
const router = require('../../routes/services.js'); // Asegúrate de cambiar esto al nombre correcto de tu archivo de rutas
const app = express();
app.use(express.json());
app.use('/', router);
const appModule = require('../../app.js'); 
//rutas de DAOs necesarias para ejecutar los test
const DaoAlumnos = require("../../DAO/DaoAlumnos");
const DaoProfesores = require("../../DAO/DaoProfesores");
const DaoSolicitudes = require("../../DAO/DaoSolicitudes");

jest.mock('../../app.js', () => ({
  pool: {
    getConnection: jest.fn().mockImplementation((callback) => {
      callback(null, {
        query: jest.fn().mockImplementation((query, params, queryCallback) => {
        }),
        release: jest.fn(),
      });
    }),
  },
}));

describe('Test envio de solicitud', () => {

  // Simulamos la SOLICITUD CORRECTA de la consulta---------------------------------------------------
  const solicitudCorrecta = {
    fecha: "22/03/2024",
    horaInicio: 12,
    telefono: "123456789",
    materia: "Matemáticas",
    mailProfesor: "profesor@example.com",
    mailAlumno: "alumno@example.com"
  }; 

  //MOCK SIMULACION DEL DAOALUMNOS-------------------------------------------------------
  const mockDaoAlumnos  = {
    obtenerAlumnoPorEmail: jest.fn().mockReturnValue({ //Simula un alumno en la base de datos
      usuario:"Alumno",
      email:"alumno@example.com",
      contrasena: "contraseña"
    }),

    alumnoNoEncontrado: jest.fn().mockReturnValue(null), //Simula un alumno que no existe
  };
  
  //MOCK SIMULACION DEL DAOPROFESORES-------------------------------------------------------
  const mockDaoProfesores  = { //Simula un profesor en la base de datos
    obtenerProfesorPorEmail: jest.fn().mockReturnValue({
    nombre: "Profesor",
    apellidos: "Prueba",
    materia: "Matemáticas",
    mailProfesor: "profesor@example.com"}), 

    profesorNoEncontrado: jest.fn().mockReturnValue(null),//Simula un profesor que no existe
  };

  //MOCK SIMULACION DEL DAOSOLICITUDES-------------------------------------------------------
  const mockDaoSolicitudes  = {
    altaSolucitud: jest.fn().mockResolvedValue(), // Simula la inserción (promesa) exitosa de la solicitud en la BD 
  };

  //SE REPITE EN CADA TEST (los daos usan los mock como base de datos)-------------------------------------
  beforeEach(()=>{
    DaoAlumnos.prototype.obtenerAlumnoPorEmail = mockDaoAlumnos.obtenerAlumnoPorEmail;
    DaoProfesores.prototype.obtenerProfesorPorEmail = mockDaoProfesores.obtenerProfesorPorEmail;
    DaoSolicitudes.prototype.altaSolucitud = mockDaoSolicitudes.altaSolucitud;
  });

  //TEST (POR CADA CRITERIO DE ACEPTACION)-------------------------------------------------------------

  test("Envio de solicitud correcta",async()=>{
    const response = await request(app)
      .post('/SolicitarServicioAUnProfesor')
      .send(solicitudCorrecta);

    //Verificamos que el servidor responda con un estado 200 y el mensaje de solicitud correcta
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Solicitud almacenada correctamente");
  });


  test("Error de solicitud con campo fecha vacio",async()=>{
    const solicitudSinFecha = { ...solicitudCorrecta }; //copia superficial de la solicitud correcta 
    delete solicitudSinFecha.fecha; //pero le quitamos la fecha

    const response = await request(app)
      .post('/SolicitarServicioAUnProfesor')
      .send(solicitudSinFecha);

    //Verificamos que el servidor responda con un estado 400 y el mensaje de fecha incorrecta
    expect(response.status).toBe(400);
    expect(response.text).toContain("Fecha incorrecta.");
  });


  test("Error de solicitud con hora de inicio incorrecta",async()=>{
    const solicitudHoraInicioIncorrecta =  { ...solicitudCorrecta, horaInicio: 6};
    //copia superficial de la solicitud correcta pero con una hora de inicio incorrecta

    const response = await request(app)
      .post('/SolicitarServicioAUnProfesor')
      .send(solicitudHoraInicioIncorrecta);

    //Verificamos que el servidor responda con un estado 400 y el mensaje de hora de inicio incorrecta
    expect(response.status).toBe(400);
    expect(response.text).toContain("Hora de inicio incorrecta.");
  });


  test("Error de solicitud con telefono incorrecto",async()=>{
    const solicitudTelefonoIncorrecto = { ...solicitudCorrecta, telefono: "123" };
    //copia superficial de la solicitud correcta pero con un numero de telefono incorrecto

    const response = await request(app)
      .post('/SolicitarServicioAUnProfesor')
      .send(solicitudTelefonoIncorrecto);

    //Verificamos que el servidor responda con un estado 400 y el mensaje de telefono incorrecto
    expect(response.status).toBe(400);
    expect(response.text).toContain("Teléfono incorrecto.");
  });


  test("Error de solicitud con campo materia vacio",async()=>{
    const solicitudMateriaVacia = { ...solicitudCorrecta, materia: "" };
    //copia superficial de la solicitud correcta pero con una materia incorrecta

    const response = await request(app)
      .post('/SolicitarServicioAUnProfesor')
      .send(solicitudMateriaVacia);

    //Verificamos que el servidor responda con un estado 400 y el mensaje de materia incorrecta
    expect(response.status).toBe(400);
    expect(response.text).toContain("La longitud del campo \"materia\" es muy largo, intenta recortarlo");
  });

  test("Error de solicitud con alumno no existente",async()=>{
    DaoAlumnos.prototype.obtenerAlumnoPorEmail = mockDaoAlumnos.alumnoNoEncontrado;
    // Enviamos la solicitud con un correo de alumno que no existe

    const alumnoNoExiste = { ...solicitudCorrecta, mailAlumno: ""};
    //copia superficial de la solicitud correcta pero con un alumno que no existe

    const response = await request(app)
      .post('/SolicitarServicioAUnProfesor')
      .send(alumnoNoExiste);

    //Verificamos que el servidor responda con un estado 400 y el mensaje de profesor no encontrado
    expect(response.status).toBe(400);
    expect(response.text).toContain("Alumno no encontrado");
  });


  test("Error de solicitud con profesor no existente",async()=>{
    DaoProfesores.prototype.obtenerProfesorPorEmail = mockDaoProfesores.profesorNoEncontrado;
    // Enviamos la solicitud con un correo de profesor que no existe

    const profesorNoExiste = { ...solicitudCorrecta, mailProfesor: ""};
    //copia superficial de la solicitud correcta pero con un profesor que no existe

    const response = await request(app)
      .post('/SolicitarServicioAUnProfesor')
      .send(profesorNoExiste);

    //Verificamos que el servidor responda con un estado 400 y el mensaje de profesor no encontrado
    expect(response.status).toBe(400);
    expect(response.text).toContain("Profesor no encontrado");
   
  });
});
