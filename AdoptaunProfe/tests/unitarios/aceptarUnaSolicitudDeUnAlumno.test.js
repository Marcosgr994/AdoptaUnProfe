const request = require('supertest')
const express = require('express')
const router = require('../../routes/services.js') // Asegúrate de cambiar esto al nombre correcto de tu archivo de rutas
const app = express()
app.use(express.json())
app.use('/', router)
const appModule = require('../../app.js')
// rutas de DAOs necesarias para ejecutar los test
// const DaoAlumnos = require('../../DAO/DaoAlumnos')
// const DaoProfesores = require('../../DAO/DaoProfesores')
const DaoSolicitudes = require('../../DAO/DaoSolicitudes')

jest.mock('../../app.js', () => ({
  pool: {
    getConnection: jest.fn().mockImplementation((callback) => {
      callback(null, {
        query: jest.fn().mockImplementation((query, params, queryCallback) => {
        }),
        release: jest.fn()
      })
    })
  }
}))

describe('Test aceptar una solicitud de un alumno', () => {

  // Mocks para simular los DAOs
  // const mockDaoAlumnos = {
  //   obtenerAlumnoPorEmail: jest.fn().mockReturnValue({ // Simula un alumno en la base de datos
  //     usuario: 'Alumno',
  //     email: 'alumno@example.com',
  //     contrasena: 'contraseña'
  //   }),

  //   alumnoNoEncontrado: jest.fn().mockReturnValue(null) // Simula un alumno que no existe
  // }

  // const mockDaoProfesores = { // Simula un profesor en la base de datos
  //   obtenerProfesorPorEmail: jest.fn().mockReturnValue({
  //     nombre: 'Profesor',
  //     apellidos: 'Prueba',
  //     materia: 'Matemáticas',
  //     mailProfesor: 'profesor@example.com'
  //   }),

  //   profesorNoEncontrado: jest.fn().mockReturnValue(null)// Simula un profesor que no existe
  // }

  const mockDaoSolicitudes = {
    actualizarSolucitud: jest.fn().mockResolvedValue() // Simula la inserción (promesa) exitosa de la solicitud en la BD
  }

  // Mocks para simular las solicitudes recibidas
  const mockSolicitud1 = {
    fecha: '21/02/2023',
    horaInicial: 15,
    telefono: '123654789',
    materia: 'Aplicaciones Web'
  }
  const mockSolicitud2 = {
    fecha: '22/02/2023',
    horaInicial: 9,
    telefono: '654987321',
    materia: 'Estructuras de Datos'
  }
  const mockSolicitud3 = {
    fecha: '23/02/2023',
    horaInicial: 22,
    telefono: '987654654',
    materia: 'Ingenieria del Software'
  }

  // SE REPITE EN CADA TEST (los daos usan los mock como base de datos)-------------------------------------
  beforeEach(() => {
    // DaoAlumnos.prototype.obtenerAlumnoPorEmail = mockDaoAlumnos.obtenerAlumnoPorEmail
    // DaoProfesores.prototype.obtenerProfesorPorEmail = mockDaoProfesores.obtenerProfesorPorEmail
    DaoSolicitudes.prototype.actualizarSolucitud = mockDaoSolicitudes.actualizarSolucitud
  })

  // Test criterios de aceptacion
  test('Profesor ha recibido alguna solicitud', async() => {
    const res = await request(app)
      .post('/AceptarUnaSolicitudDeUnAlumno')
      .send(mockSolicitud1)

      expect(res.status).toBe(200)
      expect(res.body.msg).toBe('Solicitud aceptada correctamente')
  })
})
