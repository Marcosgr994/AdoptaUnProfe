// const request = require('supertest')
const express = require('express')
const router = require('../routes/services') // Asegúrate de cambiar esto al nombre correcto de tu archivo de rutas
const app = express()
app.use(express.json())
app.use('/', router)
// const appModule = require('../app.js')
const jest = require('jest')
const Test = require('supertest/lib/test.js')

Test('EL alumno ha enviado solicitudes a algunos profesores', () => {
  jest.mock('../app.js', () => ({
    pool: {
      getConnection: jest.fn().mockImplementation((callback) => {
        callback(null, {
          query: jest.fn().mockImplementation((query, params, queryCallback) => {
            // Simulamos el resultado de la consulta
            const mockData = [
              { fecha: '21/03/2024', horaInicial: '9', telefono: '123456789', materia: 'Redes' },
              { fecha: '21/02/2024', horaInicial: '22', telefono: '123456789', materia: 'Modelado de Software' },
              { fecha: '1/01/2024', horaInicial: '15', telefono: '123456789', materia: 'Gestion de Proyectos Software' }
            ]
            queryCallback(null, mockData)
          }),
          release: jest.fn()
        })
      })
    }
  }))
})

Test('EL alumno no ha enviado solicitudes a ningun profesor', () => {
  jest.mock('../app.js', () => ({
    pool: {
      getConnection: jest.fn().mockImplementation((callback) => {
        callback(null, {
          query: jest.fn().mockImplementation((query, params, queryCallback) => {
            // Simulamos el resultado de la consulta
            const mockData = []
            queryCallback(null, mockData)
          }),
          release: jest.fn()
        })
      })
    }
  }))
})
